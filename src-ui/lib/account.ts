import { derived, get, writable, Writable } from 'svelte/store'
import { Account } from '@iota/account'
import { CDAParams, CDA } from '@iota/cda'

import { cda, persistent, getRandomNode, isDevnet } from '~/lib/helpers'
import API from '~/lib/api'

/**
 * Current active CDA address
 */
export const address = writable<cda>(null)

/**
 * Account seed
 */
export const seed = writable<string>(null)

/**
 * Receiver name for payments requests
 */
export const receiver = persistent<string>('receiver', null)

/**
 * Transaction history
 */
export type Transaction = {
    address: string
    incoming: boolean
    hash?: string
    bundle?: string
    reference?: string
    value?: number
    persistence?: boolean
    currentIndex?: number
}

export const history = persistent<Transaction[]>('history', [])

/**
 * Current transactions send state
 */
export const sendState = persistent<string>('send-state', 'idle')

/**
 * Adds new transactions to history
 */
export const updateHistory = async (incoming: boolean, payload: { address: string; bundle: Transaction[] }): Promise<void> => {
    if (!address) {
        return
    }

    const $history = get(history) as Transaction[]
    const $address = get(address) as cda

    const tx = incoming
        ? payload.bundle.find((item) => item.value > 0 && item.address === payload.address)
        : payload.bundle.find((item) => item.currentIndex === 0)

    if (!tx) {
        return
    }

    const historyEntry = $history.find((item) => item.address === tx.address)

    if (!historyEntry) {
        return
    }

    const historyIndex = $history.findIndex(
        (item) => item.address === tx.address && item.incoming === incoming && (!item.bundle || item.bundle === tx.bundle)
    )

    if ($address && $address.address.substr(0, 81) === historyEntry.address && incoming) {
        address.set(null)
    }

    if (historyIndex > -1) {
        if (!$history[historyIndex].bundle && !incoming) {
            sendState.set('done')
        }

        $history[historyIndex] = {
            ...$history[historyIndex],
            ...tx,
            persistence: $history[historyIndex].persistence || tx.persistence
        }
        history.set($history)
    } else {
        history.update((item) => item.concat([{ ...historyEntry, ...tx }]))
    }
}

/**
 * iota.js Account object
 */
export const account = derived<Writable<string>, Account<CDAParams, CDA, readonly string[]>>(
    seed,
    ($seed, set): void => {
        if (!$seed || get(account) !== null) {
            return null
        }

        const setAccount = async (): Promise<void> => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 400))

                const { createAccount } = await import('@iota/account')

                const provider = await getRandomNode()

                const acc = createAccount({
                    seed: $seed,
                    provider,
                    persistencePath: '/',
                    minWeightMagnitude: isDevnet() ? 9 : 14
                })

                set(acc)

                acc.on('pendingDeposit', (tx) => updateHistory(true, tx))
                acc.on('includedDeposit', (tx) => updateHistory(true, tx))
                acc.on('pendingWithdrawal', (tx) => updateHistory(false, tx))
                acc.on('includedWithdrawal', (tx) => updateHistory(false, tx))
                acc.on('attachToTangle', (tx) => updateHistory(false, tx))
            } catch (err) {
                console.error(err)
            }
        }

        setAccount()

        return null
    },
    null
)

/**
 * Current total available account balance
 */
export const balance = derived<Writable<Transaction[]>, number>(
    history,
    ($history, set) => {
        const total = $history.reduce((sum: number, { incoming, value, persistence }) => {
            if (!value || (incoming && !persistence)) {
                return sum
            }
            const change = incoming ? value : value * -1
            return sum + change
        }, 0)

        set(total)
    },
    0
)

/**
 * Set as active and add to history a new CDA address
 */
export const setAddress = async (amount: number, reference: string): Promise<void> => {
    const $account = get(account)

    if (!$account) {
        throw Error('No account set')
    }

    address.set(null)

    const currentTime = await API.getTime()
    const timeoutAt = Math.ceil(currentTime / 1000) + 60 * 60 * 24
    const item = await $account.generateCDA({ timeoutAt, expectedAmount: amount > 0 ? amount : undefined })

    address.set(item)

    history.update(($history) => $history.concat([{ address: item.address.substr(0, 81), reference, incoming: true }]))

    return item
}
