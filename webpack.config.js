const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode !== 'production'

module.exports = {
    entry: {
        bundle: ['./src-ui/index.js']
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
            '~': path.resolve('src-ui')
        },
        extensions: ['.mjs', '.ts', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    output: {
        path: __dirname + '/.build',
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        hotReload: devMode
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './node_modules/qr-scanner/qr-scanner-worker.min.js', to: './scanner.worker.min.js' },
            { from: './src-ui/index.html', to: './index.html' }
        ])
    ],
    mode,
    devtool: devMode ? 'source-map' : false
}
