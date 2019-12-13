type APICall = 'setSecret' | 'getSecret' | 'getTime'

type API = { [key in APICall]?: any }

interface Window {
    [key: string]: any
}

const ApiMock: API = {
    setSecret: ({ secret }: { secret: string }) => {
        return localStorage.setItem('secret', secret)
    },
    getSecret: () => {
        return localStorage.getItem('secret')
    },
    getTime: async () => {
        const response = await fetch('/api/time')
        const { time } = (await response.json()) as { time: number }
        return time
    }
}

const tauriAPI = (args: any) => {
    const generateID = (): string => {
        return Math.random()
            .toString(36)
            .substr(2, 9)
    }

    const transformCallback = (callback: (payload: any) => void) => {
        const id = generateID()
        const win = window as any
        win[id] = (result: any) => {
            delete win[id]
            return callback && callback(result)
        }
        return id
    }

    return new Promise<string>((resolve, reject) => {
        const ext = external as any
        ext.invoke(
            JSON.stringify({
                callback: transformCallback(resolve),
                error: transformCallback(reject),
                ...args
            })
        )
    })
}

const Middleware = {
    get: (_target: object, cmd: APICall) => {
        return async (payload: object): Promise<string> => {
            if (typeof external === 'undefined' || typeof (external as any).invoke === 'undefined') {
                return await ApiMock[cmd](payload)
            }
            return tauriAPI({ cmd, ...payload })
        }
    }
}

const API = new Proxy<API>({}, Middleware)

export default API
