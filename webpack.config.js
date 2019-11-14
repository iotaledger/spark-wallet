const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

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
        filename: '[name].[contenthash].js'
    },
    node: {
        __dirname: false,
        fs: 'empty'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        noParse: /\.wasm$/,
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
            },
            {
                test: /\.wasm$/,
                loaders: ['base64-loader'],
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './node_modules/qr-scanner/qr-scanner-worker.min.js', to: './scanner.worker.min.js' },
            { from: './src-ui/assets/manifest.json', to: './manifest.json' },
            { from: './src-ui/assets/worker.js', to: './worker.js' },
            { from: './src-ui/assets/bg.jpg', to: './bg.jpg' },
            { from: './src-ui/assets/bg-dark.jpg', to: './bg-dark.jpg' },
            { from: './src-ui/assets/favicon.ico', to: './favicon.ico' }
        ]),
        new HtmlWebpackPlugin({
            template: './src-ui/index.html',
            filename: './index.html'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode,
    devtool: devMode ? 'source-map' : false
}
