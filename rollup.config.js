import livereload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import alias from 'rollup-plugin-alias'
import serve from 'rollup-plugin-serve'
import path from 'path'
import fs from 'fs'

const production = !process.env.ROLLUP_WATCH
const PORT = process.env.PORT || 3000

const bundleHTML = function(options) {
    return {
        name: 'html-bundle',
        generateBundle: (_outputOptions, bundle, isWrite) => {
            return new Promise((accept, reject) => {
                if (!isWrite) return accept()
                let inject = ''

                const targetDir = path.dirname(options.target)
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir)
                }

                Object.values(bundle).forEach((module) => {
                    inject += `<script type="module">${module.code}</script>`
                })

                const css = fs.readFileSync(path.resolve(options.cssSource), 'utf8')
                inject += `<style>${css}</style>`

                const bundledContent = `<!DOCTYPE html><html lang="en"><head><meta charset="utf8" /></head><body>${inject}</body></html>`
                fs.writeFile(path.resolve(options.target), bundledContent, (err) => (err ? reject(err) : accept()))
            })
        }
    }
}

export default {
    input: './src-ui/index.js',
    output: {
        name: 'trinity',
        format: 'es',
        dir: '.build/js/'
    },
    plugins: [
        alias({
            resolve: ['.ts', '.js', '.svelte'],
            entries: [{ find: '~', replacement: path.resolve(__dirname, './src-ui') }]
        }),
        svelte({
            dev: !production,
            css: (css) => {
                css.write('.build/css/style.css', false)
            }
        }),
        resolve({
            browser: true,
            dedupe: (importee) => importee === 'svelte' || importee.startsWith('svelte/'),
            jsnext: true,
            extensions: ['.ts', '.js', '.json', '.svelte']
        }),
        commonjs(),
        !production &&
            serve({
                open: false,
                contentBase: '.build/bundle',
                port: PORT,
                historyApiFallback: true,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }),
        bundleHTML({
            cssSource: '.build/css/style.css',
            target: '.build/bundle/index.html'
        }),
        !production &&
            livereload({
                watch: '.build/bundle'
            }),
        production && terser()
    ],
    watch: {
        clearScreen: false,
        chokidar: false
    }
}
