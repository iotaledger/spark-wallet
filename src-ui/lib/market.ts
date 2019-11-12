import { get, writable, derived, Writable } from 'svelte/store'
import { fiatCurrency } from '~/lib/app'

export type MarketData = {
    rates: {
        [currency: string]: number
    }
    'history-usd': {
        data: {
            '1h': [number, number][]
            '24h': [number, number][]
            '7d': [number, number][]
            '1m': [number, number][]
        }
    }
    market: {
        usd: number
    }
}

export type MarketPrice = {
    value: number
    currency: string
}

/**
 * Historical IOTA market data
 */
export const marketData = writable<MarketData>(null)

/**
 * Current IOTA market price
 */
export const marketPrice = derived<[Writable<MarketData>, Writable<string>], MarketPrice>(
    [marketData, fiatCurrency],
    ([$marketData, $fiatCurrency], set) => {
        if ($marketData) {
            const currency = $marketData.rates[$fiatCurrency] ? $fiatCurrency : 'USD'

            set({
                value: $marketData.market.usd * $marketData.rates[currency],
                currency
            })
        }
    },
    null
)

/**
 * Fetch historical IOTA market data
 */
export const fetchMarketData = async (): Promise<void> => {
    try {
        const response = await fetch(`https://nodes.iota.works/api/market`)
        const content = await response.json()

        marketData.set(content)
    } catch (err) {
        console.log(err)
    }
}
