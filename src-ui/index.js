import Index from './Index.svelte'

try {
    if (window.location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
        })
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
