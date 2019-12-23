<script>
    import { Header } from '~/components'

    export let label
    export let help
    export let secondary
    export let hideHeader
</script>

<style>
    div {
        width: 100%;
        height: calc(100% - 65px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    div.hideHeader {
        height: 100%;
    }
</style>

{#if !hideHeader}
    <Header {label} {help} {secondary} />
{/if}
<div class:hideHeader>
    <slot />
</div>
