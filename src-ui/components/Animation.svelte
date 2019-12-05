<script>
    import { onMount } from 'svelte'
    import lottie from 'lottie-web'

    export let type

    let container
    let animation

    onMount(async () => {
        let animationData = null

        switch (type) {
            case 'loading':
                animationData = await import('./animations/loading.json')
                break
            case 'receive':
                animationData = await import('./animations/receive.json')
                break
            case 'pay':
                animationData = await import('./animations/pay.json')
                break
            case 'pay-error':
                animationData = await import('./animations/pay-error.json')
                break
            case 'pay-ok':
                animationData = await import('./animations/pay-ok.json')
                break
            default:
                animationData = await import('./animations/president.json')
                break
        }

        const options = {
            container,
            renderer: 'svg',
            animationData,
            loop: true,
            autoplay: true
        }

        animation = lottie.loadAnimation(options)

        return () => {
            animation && animation.destroy()
        }
    })
</script>

<style>
    div {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>

<div bind:this={container} />
