import Index from './Index.svelte'

try {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./worker.js')
    }
} catch (err) {
    console.log(err)
}

const index = new Index({
    target: document.body,
    props: {}
})

export default index
