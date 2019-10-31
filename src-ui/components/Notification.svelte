<script>
    import { fly } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'
    import { notification } from '~/lib/app'
</script>

<style>
    p {
        cursor: pointer;
        position: absolute;
        top: 65px;
        left: 0px;
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-weight: 500;
        color: var(--primary-fg);
        background: var(--success);
        z-index: 10;
    }
</style>

{#if $notification}
    <p transition:fly={{ x: 20, duration: 200, opacity: 0, easing: quintOut }} on:click={() => notification.set(null)}>
        {$notification}
    </p>
{/if}
