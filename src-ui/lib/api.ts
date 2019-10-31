/* eslint-disable @typescript-eslint/no-explicit-any, no-restricted-globals */
import Tauri from '~/../src-tauri/tauri'

type APICall = 'setSecret' | 'getSecret'

type API = { [key in APICall]?: any }

const ApiMock: API = {
    setSecret: ({ secret }: { secret: string }) => {
        return localStorage.setItem('secret', secret)
    },
    getSecret: () => {
        return localStorage.getItem('secret')
    }
}

const Middleware = {
    get: (_target: object, cmd: APICall) => {
        return async (payload: object): Promise<string> => {
            if (typeof external === 'undefined' || typeof (external as any).invoke === 'undefined') {
                return ApiMock[cmd](payload)
            }

            return Tauri.promisified({ cmd, ...payload })
        }
    }
}

const API = new Proxy({}, Middleware)

export default API
