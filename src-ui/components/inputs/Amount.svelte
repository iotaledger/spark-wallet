<script>
    export let amount
    export let unit

    const units = ['i', 'Ki', 'Mi', 'Gi', 'Ti']

    const switchUnit = () => {
        const index = units.indexOf(unit)
        unit = units[index === units.length - 1 ? 0 : index + 1]
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
    button {
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
</style>

<div>
    <input type="number" placeholder="Enter amount" bind:value={amount} />
    <button on:click={switchUnit}>{unit}</button>
</div>
