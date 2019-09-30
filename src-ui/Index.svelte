<script>
    import { onMount } from 'svelte'

    import { seed } from '~/lib/state'

    import Setup from '~/views/Setup'
    import Receive from '~/views/Receive'
</script>

<style>
    :global(:root) {
        --background: #ffffff;
        --background-gradient: linear-gradient(180deg, #edf1f5 25.48%, #edf1f5 100%);
        --text: #41415d;
        --text-light: #b1bcc4;
        --highlight: #175add;
        --highlight-text: #ffffff;
        --highlight-gradient: linear-gradient(233.58deg, #175add 9.87%, #1633ca 97.93%);
    }
    :global(*, *:after, *:before) {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: 400;
        box-sizing: border-box;
        outline: none;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: var(--bg);
        color: var(--fg);
        user-select: none;
        padding: 20px;
        font-family: Sans-Serif;
    }
</style>

<main>
    {#if $seed}
        <Receive />
    {:else}
        <Setup />
    {/if}
</main>
