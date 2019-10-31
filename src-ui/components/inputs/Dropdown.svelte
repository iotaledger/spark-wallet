<script>
    import FlagUS from '~/assets/flags/us.svelte'
    import FlagUK from '~/assets/flags/uk.svelte'

    const flags = {
        uk: FlagUK,
        us: FlagUS
    }

    export let flag
    export let value

    $: Flag = flags[flag]
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

    flag {
        position: relative;
        overflow: hidden;
        margin-right: 13px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: blue;
    }

    div p {
        font-weight: 600;
        opacity: 0.5;
        line-height: 13px;
    }
</style>

<div>
    <flag>
        <Flag />
    </flag>
    <p>{value}</p>
</div>
