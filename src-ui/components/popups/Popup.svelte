<script>
    export let active
    export let solid

    const onkey = (e) => {
        if (e.key === 'Escape') {
            active = false
        }
    }
</script>

<style>
    popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        max-width: var(--max-width);
        max-height: var(--max-height);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background: var(--popup-bg);
        z-index: 3;
        pointer-events: none;
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    }

    popup.solid {
        background: var(--bg);
    }

    popup.active {
        opacity: 1;
        pointer-events: all;
    }
</style>

<svelte:window on:keydown={onkey} />

<popup class:active class:solid>
    <slot />
</popup>
