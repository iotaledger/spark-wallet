import Tauri from '~/../src-tauri/tauri'

const Middleware = {
    get: (_target, cmd) => {
        return async (payload) => {
            return await Tauri.promisified({ cmd, ...payload })
        }
    }
}

const API = new Proxy({}, Middleware)

export default API
