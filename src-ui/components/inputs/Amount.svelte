<script>
    import { marketPrice } from '~/lib/market'
    import { formatValue } from '~/lib/helpers'

    export let amount
    export let unit

    let dropdown = false

    $: marketValue = formatValue(amount, $marketPrice, unit)
    $: units = ['i', 'Ki', 'Mi', 'Gi', 'Ti', $marketPrice.currency]

    const clickOutside = () => {
        dropdown = false
    }
</script>

<style>
    div {
        position: relative;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    div > button {
        position: absolute;
        top: 7px;
        right: 8px;
        width: 36px;
        height: 37px;
        border-radius: 5px;
        background: var(--secondary);
        color: var(--secondary-fg);
        text-align: center;
        font-size: 14px;
        line-height: 37px;
        font-weight: 700;
    }

    span {
        position: absolute;
        top: 18px;
        right: 54px;
        font-size: 13px;
        color: var(--light);
        text-align: right;
    }

    nav {
        position: absolute;
        top: 48px;
        right: 0px;
        background: var(--input-bg);
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        opacity: 0;
        transition: opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }

    nav.active {
        opacity: 1;
        pointer-events: all;
    }

    nav button {
        display: block;
        background: var(--input-bg);
        height: 36px;
        width: 68px;
        text-align: center;
        font-size: 14px;
    }

    nav button:hover {
        background: var(--dropdown-hover);
    }

    nav button.active {
        background: var(--dropdown-active);
    }

    nav button:first-child {
        border-radius: 3px 3px 0 0;
    }
    nav button:last-child {
        border-radius: 0 0¬ 3px 3px;
    }
</style>

<svelte:window on:click={clickOutside} />

<div>
    <input type="number" placeholder="Enter your amount" bind:value={amount} />
    {#if amount}
        <span>={unit !== $marketPrice.currency ? marketValue.fiat : `${marketValue.rounded} ${marketValue.unit}`}</span>
    {/if}
    <button
        on:click={(e) => {
            e.stopPropagation()
            dropdown = !dropdown
        }}>
        {unit}
    </button>
    <nav class:active={dropdown}>
        {#each units as item}
            <button
                class:active={unit === item}
                on:click={() => {
                    unit = item
                }}>
                {item}
            </button>
        {/each}
    </nav>
</div>
