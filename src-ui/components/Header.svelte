<script>
    import { goto } from '~/lib/helpers'

    import { Help, Icon } from '~/components'

    export let label
    export let help
    export let secondary

    let showHelp = false
</script>

<style>
    header {
        display: flex;
        position: relative;
        width: 100%;
    }

    button:first-of-type {
        display: flex;
        align-items: center;
        width: 100%;
        height: 65px;
        background: var(--primary);
        color: var(--primary-fg);
        padding: 0 20px;
        font-size: 16px;
    }

    button.right {
        position: absolute;
        top: 5px;
        right: 0px;
        width: 61px;
        height: 60px;
        background: none;
    }

    button span {
        flex: 1;
        text-align: center;
        padding-right: 23px;
        font-weight: 600;
    }
</style>

<header>
    <button on:click={() => goto('')}>
        {#if !secondary}
            <Icon icon="back" primary />
        {/if}
        <span>{label}</span>
    </button>
    {#if secondary}
        <button class="right" on:click={() => goto('')}>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.279 7.339L.53 1.59a.75.75 0 111.06-1.06L7.34 6.277 13.087.53a.75.75 0 011.06 1.06L8.4 7.34l5.75
                    5.75a.75.75 0 11-1.06 1.06L7.34 8.4l-5.75 5.75a.75.75 0 01-1.061-1.06l5.75-5.75z"
                    fill="#FFF"
                    fill-rule="nonzero" />
            </svg>
        </button>
    {/if}
    {#if help}
        <button
            on:click={() => {
                showHelp = true
            }}
            class="right">
            <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8" stroke="#fff" stroke-width="2" />
                <path fill="#fff" d="M8 8h2v5H8z" />
                <circle cx="9" cy="6" r="1" fill="#fff" />
            </svg>
        </button>
        <Help bind:active={showHelp}/>
    {/if}
</header>
