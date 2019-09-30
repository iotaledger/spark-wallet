<script>
    import { onMount } from 'svelte'
    import API from '~/lib/api'

    import { seed } from '~/lib/state'

    async function generateSeed() {
        const newSeed = await API.generateSeed()
        seed.set(newSeed)
    }
</script>

<style>
    button {
        display: inline-block;
        font-size: 13px;
        font-weight: 700;
        padding: 22px;
        width: 70%;
        background: var(--highlight);
        color: var(--highlight-text);
        border-radius: 37px;
        cursor: pointer;
    }
</style>

<button on:click={generateSeed}>Generate seed</button>
