<script>
    import { fly, scale } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'
    import { readable } from 'svelte/store'

    import path from '~/lib/router'

    export let route
    export let primary
    export let secondary
    export let left
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
    {#if primary}
        <div transition:scale={{ duration: 380, start: 0.95, oapcity: 0.9 }}>
            <slot />
        </div>
    {:else if secondary}
        <div transition:scale={{ duration: 300, start: 1.05, opacity: 0 }}>
            <slot />
        </div>
    {:else}
        <div transition:fly={{ x: left ? 360 : -360, duration: 280, opacity: 0 }}>
            <slot />
        </div>
    {/if}
{/if}
