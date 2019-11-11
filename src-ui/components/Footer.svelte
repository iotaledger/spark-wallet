<script>
    export let tooltip
</script>

<style>
    footer {
        display: flex;
        width: 100%;
        padding: 20px;
    }

    @media only screen and (max-height: 600px) {
        footer {
            padding: 16px;
        }
    }

    footer.tooltip {
        flex-direction: column;
        background: var(--box-bg);
        border-radius: 20px 20px 0 0;
        width: 100%;
        margin: 0;
        font-size: 12px;
    }
</style>

<footer class:tooltip>
    <slot />
</footer>
