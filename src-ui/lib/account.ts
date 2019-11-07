import { derived, get, writable, Writable } from 'svelte/store'
import { createAccount, Account } from '@iota/account'
import { CDAParams, CDA } from '@iota/cda'

import { cda, persistent, getRandomNode } from '~/lib/helpers'

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
    reference?: string
    value?: number
    persistence?: boolean
    currentIndex?: number
}

export const history = persistent<Transaction[]>('history', [])

/**
 * Current transactions send state¬
 */
export const sendState = persistent<string>('send-state', 'idle')

/**
 * Adds new transactions to history
 */
export const updateHistory = async (
    incoming: boolean,
    { address, bundle }: { address: string; bundle: Transaction[] }
): Promise<void> => {
    if (!address) {
        return
    }

    const $history = get(history) as Transaction[]

    const tx = incoming
        ? bundle.find((item) => item.value > 0 && item.address === address)
        : bundle.find((item) => item.currentIndex === 0)

    if (!tx) {
        return
    }

    const addressExists = $history.findIndex((item) => item.address === tx.address)

    if (addressExists < 0) {
        return
    }

    const existingTx = $history[addressExists]

    if (!existingTx.hash || existingTx.hash === tx.hash) {
        if (!existingTx.hash && !incoming) {
            sendState.set('done')
            get(account).stop()
        }
        $history[addressExists] = { ...existingTx, ...tx }
        history.set($history)
    } else {
        history.update((item) => item.concat([{ ...tx, incoming }]))
    }
}

/**
 * iota.js Account object
 */
export const account = derived<Account<CDAParams, CDA, readonly string[]>, Writable<string>>(
    seed,
    ($seed, set): void => {
        if (!$seed || get(account) !== null) {
            return null
        }

        const setAccount = async (): Promise<void> => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 400))

                const provider = await getRandomNode()

                const acc = createAccount({
                    seed: $seed,
                    provider,
                    persistencePath: '/'
                })

                set(acc)

                acc.on('pendingDeposit', (tx) => updateHistory(true, tx))
                acc.on('includedDeposit', (tx) => updateHistory(true, tx))
                acc.on('pendingWithdrawal', (tx) => updateHistory(false, tx))
                acc.on('includedWithdrawal', (tx) => updateHistory(false, tx))
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
export const balance = derived<number, Writable<Transaction[]>>(history, ($history, set): void => {
    const total = $history.reduce((sum: number, { incoming, value, persistence }) => {
        if (!value || (incoming && !persistence)) {
            return sum
        }
        const change = incoming ? value : value * -1
        return sum + change
    }, 0)

    set(total)
})

/**
 * Set as active and add to history a new CDA address
 */
export const setAddress = async (amount: number, reference: string): Promise<void> => {
    const $account = get(account)

    if (!$account) {
        throw Error('No account set')
    }

    address.set(null)

    const timeoutAt = Math.ceil(Date.now() / 1000) + 60 * 60 * 24
    const item = await $account.generateCDA({ timeoutAt, expectedAmount: amount > 0 ? amount : undefined })

    address.set(item)

    history.update(($history) => $history.concat([{ address: item.address.substr(0, 81), reference, incoming: true }]))
}
