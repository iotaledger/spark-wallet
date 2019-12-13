const path = require('path')

const distDir = path.resolve(__dirname, '.build')

module.exports = function() {
    return {
        dev: {},
        build: {
            distDir,
            devPath: 'http://localhost:3000' // devServer URL or path to html file
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
                width: 460,
                height: 680,
                resizable: false
            },
            security: {
                csp:
                    "default-src data: 'self' 'unsafe-inline'; connect-src http://localhost:* ws://localhost:* https://*; style-src-elem https://* 'unsafe-inline'; font-src https://*"
            }
        }
    }
}
