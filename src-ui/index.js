import Index from './Index.svelte'

try {
    if (window.location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('./worker.js')
    }
} catch (err) {
    console.log(err)
}

window.location.hash = ''

const index = new Index({
    target: document.body,
    props: {}
})

export default index
