import { writable, derived, Writable } from 'svelte/store'

type MarketEntry = {
    time: number
    close: number
}

type MarketData = {
    hourly: MarketEntry[]
    daily: MarketEntry[]
}

/**
 * Historical IOTA market data
 */
export const marketData = writable<MarketData>(null)

/**
 * Current IOTA market price
 */
export const marketPrice = derived<number, Writable<MarketData>>(marketData, ($marketData) =>
    $marketData ? $marketData.daily[$marketData.daily.length - 1].close : 0
)

/**
 * Fetch historical IOTA market data
 */
export const fetchMarketData = async (): Promise<void> => {
    const timeframes = [
        {
            frame: 'hour',
            limit: '168'
        },
        {
            frame: 'day',
            limit: '90'
        }
    ]

    const data: MarketEntry[][] = await Promise.all(
        timeframes.map(async ({ frame, limit }) => {
            try {
                const response = await fetch(
                    `https://min-api.cryptocompare.com/data/histo${frame}?fsym=MIOTA&tsym=USD&limit=${limit}`
                )
                const content = await response.json()

                if (content && content.Data && content.Data.length) {
                    return content.Data.map(({ time, close }: { time: number; close: number }) => {
                        return { time, close }
                    })
                }

                return []
            } catch (err) {
                return []
            }
        })
    )

    if (data[0].length === 0 || data[1].length === 0) {
        return
    }

    marketData.set({
        hourly: data[0],
        daily: data[1]
    })
}
