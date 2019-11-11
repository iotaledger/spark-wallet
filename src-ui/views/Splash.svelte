<script>
    import { onMount } from 'svelte'

    import { Icon } from '~/components'
    import Rocketman from '~/assets/Rocketman'

    let index = 0
    let frame

    function loop() {
        if (frame % 10 === 0) {
            index = index === 3 ? 0 : index + 1
        }
        frame = requestAnimationFrame(loop)
    }

    onMount(() => {
        loop()
        return () => {
            cancelAnimationFrame(frame)
        }
    })
</script>

<style>
    main {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        background: var(--primary);
        color: var(--primary-fg);
        padding: 66px 0 55px;
    }
    h1 {
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4em;
    }
    p {
        text-align: left;
        width: 85px;
    }

    p span {
        letter-spacing: 0.1em;
    }
</style>

<main>
    <Icon icon="logo" primary />
    <h1>
        An IOTA Labs
        <br />
        experiment
    </h1>

    <Rocketman />

    <p>
        Launching
        <span>{'...'.substr(0, index)}</span>
    </p>
</main>
