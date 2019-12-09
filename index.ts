import express from 'express'
import webpack from 'webpack'
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

import routeTime from './api/time'
import routeManifest from './api/manifest'

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
)

app.use(webpackHotMiddleware(compiler))

app.use('/api/time', routeTime)
app.use('/manifest.json', routeManifest)

app.listen(3000, function() {
    console.log('Spark running on port 3000')
})
