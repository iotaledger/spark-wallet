<script>
    import Popup from './Popup'
    import { Button, Icon } from '~/components'

    export let active
    export let onConfirm
</script>

<style>
    section {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        max-width: calc(var(--max-width) - 48px);
        transform: translate(-50%, -50%);
        background: var(--list-bg);
        border-radius: 10px;
        animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    header {
        padding: 20px 0;
        background: var(--warning);
        text-align: center;
        border-radius: 10px 10px 0 0;
    }

    article {
        padding: 36px 24px;
    }

    footer {
        display: flex;
        height: 158px;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px 24px 12px;
    }
</style>

<Popup bind:active>
    <section>
        <header>
            <Icon icon="warning" primary />
        </header>
        <section />
        <article>
            <slot />
        </article>
        <footer>
            <Button onClick={onConfirm} label="Yes, destroy wallet" warning />
            <Button
                onClick={() => {
                    active = null
                }}
                label="Cancel"
                blank />
        </footer>
    </section>
</Popup>
