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
    export let blank = false
</script>

<style>
    button {
        display: block;
        width: 100%;
        height: 54px;
        background: var(--primary);
        color: var(--primary-fg);
        font-size: 14px;
        font-weight: 700;
        border-radius: 30px;
    }

    @media only screen and (max-height: 600px) {
        button {
            height: 48px;
        }
    }

    button:hover {
        background: var(--primary-hover);
    }

    button.secondary {
        background: var(--secondary);
        color: var(--secondary-fg);
    }
    button.secondary:hover {
        background: var(--secondary-hover);
    }

    button.warning {
        background: var(--warning);
        color: var(--warning-fg);
    }
    button.warning:hover {
        background: var(--warning-hover);
    }

    button.small {
        height: 45px;
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
        opacity: 0.5;
    }
    button.blank {
        background: none;
        border: 1px solid var(--fg);
        color: var(--fg);
    }
</style>

<button
    class:list
    class:blank
    class:disabled
    class:warning
    class:secondary
    class:small
    class:double
    class:loading
    on:click={onClick}>
    {loading ? loadingLabel : label}
</button>
