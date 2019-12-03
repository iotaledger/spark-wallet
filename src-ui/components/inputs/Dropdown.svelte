<script>
    export let value
    export let items = []
    export let onSelect
    export let flag = false
    export let disabled = false

    let dropdown = false

    const getFlagName = (country) => {
        if (country === 'American Samoa') {
            return 'united-states-of-america'
        }

        if (country === 'Bouvet Island') {
            return 'norway'
        }

        if (country === 'Andorra') {
            return 'european-union'
        }

        return country
            .replace(' (The)', '')
            .replace(' (The Republic Of)', '')
            .replace(/\s+/g, '-')
            .toLowerCase()
    }

    const clickOutside = () => {
        dropdown = false
    }
</script>

<style>
    div {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 22px;
        height: 52px;
        padding: 0 20px;
        background: var(--input-bg);
        border-radius: 7px;
        border: 1px solid var(--input-border);
        width: 100%;
    }
    div:after {
        content: '';
        top: 22px;
        right: 20px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7px 6px 0 6px;
        border-color: var(--input-carret) transparent transparent transparent;
        position: absolute;
    }

    div.disabled {
        opacity: 0.4;
        pointer-events: none;
    }

    img {
        position: relative;
        overflow: hidden;
        margin-right: 13px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
    }

    div p {
        font-weight: 600;
        opacity: 0.5;
        line-height: 13px;
    }

    nav {
        position: absolute;
        top: 56px;
        left: 0px;
        width: 100%;
        max-height: 260px;
        overflow-y: scroll;
        background: var(--input-bg);
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
        border-radius: 7px;
        opacity: 0;
        transition: opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: 2;
    }

    nav.active {
        opacity: 1;
        pointer-events: all;
    }

    nav button {
        display: flex;
        align-items: center;
        background: var(--input-bg);
        height: 36px;
        padding: 0 20px;
        width: 100%;
        text-align: left;
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

<div
    class:disabled
    on:click={(e) => {
        e.stopPropagation()
        dropdown = !dropdown
    }}>
    {#if flag}
        <img src="/flags/{getFlagName(flag)}.svg" alt="" />
    {/if}
    <p>{value}</p>
    <nav class:active={dropdown}>
        {#each items as item}
            <button on:click={() => onSelect(item.value)} class:active={item.label === value}>
                {#if item.flag}
                    <img src="/flags/{getFlagName(item.flag)}.svg" alt="" />
                {/if}
                {item.label}
            </button>
        {/each}
    </nav>
</div>
