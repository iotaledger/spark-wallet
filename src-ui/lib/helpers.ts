/* eslint-disable no-await-in-loop */
import URL from 'url-parse'
import { writable, Writable } from 'svelte/store'

import { NODELIST_ENDPOINTS } from '~/lib/config'
import { MarketPrice } from '~/lib/market'

type iotaUnit = 'i' | 'Ki' | 'Mi' | 'Gi' | 'Ti'

export type cda = {
    address: string
    timeoutAt: number
    expectedAmount?: number
    multiUse?: boolean
}

type cdaUrl = cda & { receiver?: string; reference?: string }

/**
 * Update application path
 */
export const goto = (path: string): void => {
    window.location.hash = path
}

/**
 * Generate a random seed
 */
export const generateSeed = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'

    const randomBytes = (size: number, max = 256): number[] => {
        const rawBytes = new Uint8Array(size)

        const bytes = crypto.getRandomValues(rawBytes)

        for (let i = 0; i < bytes.length; i += 1) {
            while (bytes[i] >= 256 - (256 % max)) {
                const [firstByte] = randomBytes(1, max)
                bytes[i] = firstByte
            }
        }

        return Array.from(bytes)
    }

    const bytes = randomBytes(81, chars.length)

    return bytes.map((byte) => chars[byte % chars.length]).join('')
}

/**
 * Fetch list of and select a single random IRI node
 */
export const getRandomNode = async (): Promise<string> => {
    if (isDevnet()) {
        return 'https://nodes.devnet.iota.org:443'
    }

    const requestOptions = {
        headers: {
            Accept: 'application/json'
        }
    }

    let nodes = []

    for (let index = 0; index < NODELIST_ENDPOINTS.length; index += 1) {
        const endPoint = NODELIST_ENDPOINTS[index]

        const response = await Promise.race<Promise<Response>>([
            fetch(endPoint, requestOptions),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Fetch timeout')), 3000))
        ])

        const remoteList = await response.json()

        nodes = remoteList.filter(
            ({ node, pow }: { node: string; pow: boolean }) =>
                typeof node === 'string' && node.indexOf('https://') === 0 && typeof pow === 'boolean'
        )

        break
    }

    if (nodes.length === 0) {
        throw Error('No nodes returned')
    }

    return nodes[Math.floor(Math.random() * nodes.length)].node
}

/**
 * Format iota value to value units and calculate market value
 */
export const formatValue = (
    iotas: number,
    marketPrice: MarketPrice,
    units?: string
): { value: number; rounded: string; unit: string; fiat: string } => {
    let value = getIotas(iotas, units, marketPrice)
    let unit: iotaUnit = 'i'

    const fiat = !marketPrice
        ? '-'
        : (marketPrice.value * (value / 1000000)).toLocaleString('en-US', {
              style: 'currency',
              currency: marketPrice.currency,
              maximumFractionDigits: 5
          })

    switch (true) {
        case value < 1000:
            break
        case value < 1000000:
            value /= 1000
            unit = 'Ki'
            break
        case value < 1000000000:
            value /= 1000000
            unit = 'Mi'
            break
        case value < 1000000000000:
            value /= 1000000000
            unit = 'Gi'
            break
        default:
            value /= 1000000000000
            unit = 'Ti'
            break
    }

    const rounded = Math.round(value * 10) / 10 + (iotas < 1000 || (iotas / value) % 10 === 0 ? '' : '+')

    return {
        value,
        rounded,
        unit,
        fiat
    }
}

/**
 * Domain based check if Spark should use Devnet
 */
export const isDevnet = () => {
    return window.location.href.indexOf('//spark-devnet') > 0 || window.location.href.indexOf('//localhost') > 0
}

/**
 * Convert iota unit value to iota value
 */
export const getIotas = (value: number, unit: string, marketPrice: MarketPrice): number => {
    if (!unit) {
        return value
    }

    switch (unit) {
        case 'i':
            return value
        case 'Ki':
            return value * 1000
        case 'Mi':
            return value * 1000000
        case 'Gi':
            return value * 1000000000
        case 'Ti':
            return value * 1000000000000
        default:
            return Math.floor(value * marketPrice.value * 1000000)
    }
}

/**
 * Get current application domain
 */
export const getDomain = () => {
    const protocol = typeof window === 'object' ? window.location.protocol : 'http:'
    const host = typeof window === 'object' ? window.location.host : 'localhost:3000'

    return `${protocol}//${host}`
}

/**
 * Create an iota CDA link
 */
export const createLink = (
    address: cda,
    amount: number,
    unit: iotaUnit,
    message: string,
    receiver: string,
    marketPrice: MarketPrice
): string => {
    if (!address) {
        return null
    }

    let link = `${getDomain()}/?address=${address.address}&timeoutAt=${address.timeoutAt}`

    if (typeof message === 'string' && message.length) {
        link = `${link}&message=${encodeURI(message)}`
    }
    if (typeof amount === 'number' && amount > 0) {
        link = `${link}&amount=${getIotas(amount, unit, marketPrice)}`
    }

    if (typeof receiver === 'string' && receiver.length) {
        link = `${link}&receiver=${encodeURI(receiver)}`
    }

    return link
}

/**
 * Parse a CDA link
 */
export const parseLink = (input?: string): cdaUrl => {
    if (!input) {
        input = window.location.href
    }

    if (input.toLowerCase().indexOf(getDomain()) !== 0) {
        return null
    }

    const result: cdaUrl = {
        address: null,
        reference: null,
        expectedAmount: null,
        timeoutAt: null,
        receiver: null
    }

    try {
        const url = new URL(input, true)
        const { address, message, amount, timeoutAt, receiver } = url.query

        if (address.match(/^[A-Z9]{90}$/)) {
            result.address = address.toUpperCase()
        } else {
            return null
        }

        if (timeoutAt && String(timeoutAt) === String(parseInt(timeoutAt, 10))) {
            result.timeoutAt = Math.abs(parseInt(timeoutAt, 10))
        } else {
            return null
        }

        if (amount && String(amount) === String(parseInt(amount, 10))) {
            result.expectedAmount = Math.abs(parseInt(amount, 10))
        }

        if (message && typeof message === 'string') {
            result.reference = message
        }

        if (receiver && typeof receiver === 'string') {
            result.receiver = receiver
        }
    } catch (error) {
        return null
    }

    return result
}

/**
 * Format timestamp to human readable date string
 */
export const formatDate = (time: number, type: 'short' | 'long' | 'time' = 'short'): string => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(time * 1000)

    switch (type) {
        case 'short':
            return `${date.toLocaleDateString(navigator.language)} ${date.toLocaleTimeString(navigator.language)}`
        case 'long':
            return date.toLocaleDateString(navigator.language, options)
        default:
            return date.toLocaleTimeString(navigator.language)
    }
}

/**
 * Get time units from a timestamp
 */
export const getTimeUnits = (input: number, unit: 'h' | 'm' | 's'): string => {
    switch (unit) {
        case 'h':
            return String(Math.floor(input / 3600)).padStart(2, '0')
        case 'm':
            return String(Math.floor((input % 3600) / 60)).padStart(2, '0')
        default:
            return String(Math.floor((input % 3600) % 60)).padStart(2, '0')
    }
}

/**
 * Persist a writable Svelte store to local storage
 */
export const persistent = <T>(key: string, initialValue: T): Writable<T> => {
    let value = initialValue

    try {
        const json = localStorage.getItem(key)
        if (json) {
            value = JSON.parse(json)
        }
    } catch (err) {
        console.error(err)
    }

    const state = writable(value)

    state.subscribe(($value): void => {
        localStorage.setItem(key, JSON.stringify($value))
    })

    return state
}

/**
 * Set text to clipboard
 */
export const setClipboard = (input: string): boolean => {
    try {
        const textArea = document.createElement('textarea')
        textArea.value = input
        document.body.appendChild(textArea)

        if (navigator.userAgent.match(/ipad|iphone/i)) {
            const range = document.createRange()
            range.selectNodeContents(textArea)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            textArea.setSelectionRange(0, 999999)
        } else {
            textArea.select()
        }

        document.execCommand('copy')
        document.body.removeChild(textArea)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
