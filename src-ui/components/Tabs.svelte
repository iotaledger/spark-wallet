<script>
    export let tabs = []
    export let tab
</script>

<style>
    nav {
        display: flex;
    }
    nav button {
        position: relative;
        flex: 1;
        background: var(--box-bg);
        font-weight: 600;
        height: 58px;
        line-height: 58px;
        font-size: 13px;
    }
    nav button:before {
        content: '';
        width: 0%;
        height: 3px;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0);
        background: var(--secondary);
        transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    nav button.active:before {
        width: 70%;
    }
</style>

<nav>
    {#each tabs as item}
        <button
            on:click={() => {
                tab = item
            }}
            class:active={item === tab}>
            {item}
        </button>
    {/each}
</nav>
