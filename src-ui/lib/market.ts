import { writable, derived, Writable } from 'svelte/store'

type MarketData = {
    currencies: {
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

/**
 * Historical IOTA market data
 */
export const marketData = writable<MarketData>(null)

/**
 * Current IOTA market price
 */
export const marketPrice = derived<Writable<MarketData>, number>(marketData, ($marketData) =>
    $marketData ? $marketData.market.usd : 0
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
