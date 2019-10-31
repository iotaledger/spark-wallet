const path = require('path')

const distDir = path.resolve(__dirname, '.build')

module.exports = function() {
    return {
        dev: {},
        build: {
            distDir
        },
        ctx: {},
        tauri: {
            embeddedServer: {
                active: true
            },
            bundle: {
                active: true
            },
            whitelist: {
                all: true
            },
            window: {
                title: 'Spark',
                width: 360,
                height: 640,
                resizable: false
            },
            security: {
                csp:
                    "default-src data: 'self' 'unsafe-inline'; connect-src http://localhost:* ws://localhost:* https://*; style-src-elem https://* 'unsafe-inline'; font-src https://*"
            }
        }
    }
}
