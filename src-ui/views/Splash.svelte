<script>
    import { onMount } from 'svelte'

    import { Rocketman, Icon } from '~/components'

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
    :global(main.splash) {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        height: 100%;
        background: var(--primary);
        color: var(--primary-fg);
        padding: 66px 0 55px;
    }

    :global(main.splash h1) {
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4em;
    }

    :global(main.splash p) {
        text-align: left;
        width: 85px;
    }

    :global(main.splash p span) {
        letter-spacing: 0.1em;
    }

    :global(main.splash div) {
        height: 242px;
    }

    :global(main.splash div svg) {
        height: 100%;
    }

    @media (max-height: 560px) {
        :global(main.splash) {
            padding: 30px 0;
        }

        :global(main.splash div) {
            height: 160px;
        }
    }
</style>

<main class="splash">
    <Icon icon="logo" primary />
    <h1>
        An IOTA Labs
        <br />
        experiment
    </h1>

    <div>
        <Rocketman />
    </div>

    <p>
        Launching
        <span>{'...'.substr(0, index)}</span>
    </p>
</main>
