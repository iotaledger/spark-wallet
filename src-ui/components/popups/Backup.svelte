<script>
    import { error, backupReminder } from '~/lib/app'

    import Popup from './Popup'
    import { Animation, Button, Icon } from '~/components'

    export let showExport

    const onConfirm = () => {
        showExport = true
        backupReminder.set(false)
    }

    const onDeny = () => {
        backupReminder.set(false)
    }
</script>

<style>
    section {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 48px);
        max-width: calc(var(--max-width) - 48px);
        transform: translate(-50%, -50%);
        background: var(--list-bg);
        border-radius: 10px;
    }

    header {
        padding: 20px 0;
        background: var(--warning);
        color: var(--warning-fg);
        text-align: center;
        border-radius: 10px 10px 0 0;
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
    }

    animation {
        display: block;
        height: 140px;
        margin-bottom: 30px;
    }

    article {
        padding: 36px 24px 0;
    }

    p {
        text-align: center;
        margin-bottom: 20px;
    }

    p strong {
        font-weight: 600;
    }

    footer {
        display: flex;
        padding: 0 24px 24px;
    }
</style>

<Popup active>
    <section>
        <header>Backup your wallet</header>
        <article>
            <animation>
                <Animation type="president" />
            </animation>
            <p>If you use your browser in Incognito mode, or your browser cache is reset, you can loose your funds.</p>
            <p>
                <strong>Would you like to backup your wallet now?</strong>
            </p>
        </article>
        <footer>
            <Button onClick={onDeny} label="No" double />
            <Button onClick={onConfirm} label="Yes" double />
        </footer>
    </section>
</Popup>
