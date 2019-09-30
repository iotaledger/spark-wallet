const path = require('path')

const distDir = path.resolve(__dirname, './.build/bundle')

module.exports = function() {
    return {
        dev: {},
        build: {
            distDir
        },
        ctx: {},
        tauri: {
            embeddedServer: {
                active: false
            },
            bundle: {
                active: true
            },
            whitelist: {
                all: true
            },
            window: {
                title: 'Burner'
            },
            security: {
                csp: "default-src data: filesystem: ws: http: https: 'unsafe-eval' 'unsafe-inline'"
            }
        }
    }
}
