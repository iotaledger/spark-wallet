import Index from './Index.svelte'

/**
 * Install service worker
 */
try {
    if (window.location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
        })
    }
} catch (err) {
    console.log(err)
}

/**
 * Reset router location
 */

window.location.hash = ''

/**
 * Init main component
 */

const target = document.body
target.innerHTML = ''

const index = new Index({
    target: document.body,
    props: {}
})

export default index
