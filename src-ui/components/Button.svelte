<script>
    export let label
    export let loadingLabel = ''
    export let onClick

    export let secondary = false
    export let warning = false
    export let small = false
    export let double = false
    export let loading = false
    export let disabled = false
    export let list = false
</script>

<style>
    button {
        display: block;
        width: 100%;
        background: var(--primary);
        color: var(--primary-fg);
        font-size: 14px;
        font-weight: 700;
        padding: 17px 0;
        border-radius: 30px;
    }

    button.secondary {
        background: var(--secondary);
        color: var(--secondary-fg);
    }

    button.warning {
        background: var(--warning);
        color: var(--warning-fg);
    }

    button.list {
        background: var(--list-button);
    }

    button.small {
        padding: 12px 0;
        font-size: 13px;
    }

    button.double {
        border-radius: 30px 0 0 30px;
    }

    button.loading {
        pointer-events: none;
    }

    button.double + button.double {
        border-radius: 0 30px 30px 0;
        border-left: 1px solid var(--bg);
    }
    button.disabled {
        pointer-events: none;
        opacity: 0.4;
    }
</style>

<button class:list class:disabled class:warning class:secondary class:small class:double class:loading on:click={onClick}>
    {loading ? loadingLabel : label}
</button>
