const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode !== 'production'

const config = {
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
        publicPath: process.env.TAURI ? '' : '/',
        filename: '[name].[contenthash].js'
    },
    node: {
        __dirname: false,
        fs: 'empty'
    },
    module: {
        noParse: /\.wasm$/,
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        hotReload: devMode,
                        emitCss: true
                    }
                }
            },
            {
                test: /\.wasm$/,
                loaders: ['base64-loader'],
                type: 'javascript/auto'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: devMode
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
          patterns: [
              { from: './node_modules/qr-scanner/qr-scanner-worker.min.js', to: './scanner.worker.min.js' },
              { from: './src-ui/assets/*', to: './', flatten: true },
              { from: './src-ui/assets/icons/*', to: './icons', flatten: true },
              { from: './src-ui/assets/splash/*', to: './splash', flatten: true },
              { from: './src-ui/assets/flags/*', to: './flags', flatten: true }
          ]
        }),
        new HtmlWebpackPlugin({
            template: './src-ui/index.html',
            filename: './index.html',
            minify: true,
            devMode
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new MiniCssExtractPlugin()
    ],
    mode
}

if (devMode) {
    config.plugins.push(new LiveReloadPlugin())
}

module.exports = config
