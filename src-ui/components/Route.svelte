<script>
    import { fly } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'
    import { readable } from 'svelte/store'

    import path from '~/lib/router'

    export let route
    export let primary
</script>

<style>
    div {
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background: var(--bg);
    }
</style>

{#if $path === route}
    <div transition:fly={{ x: primary ? -20 : 360, duration: 380, opacity: 0.7, easing: quintOut }}>
        <slot />
    </div>
{/if}
