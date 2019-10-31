<script>
    import { formatDate } from '~/lib/helpers'

    import { Button } from '~/components'

    export let tx
    export let active

    const onkey = (e) => {
        if (e.key === 'Escape') {
            active = null
        }
    }
</script>

<style>
    popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        max-width: 360px;
        max-height: 640px;
        transform: translate(-50%, -50%);
        overflow: hidden;
        background: var(--popup-bg);
        z-index: 3;
        pointer-events: none;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    }
    popup.active {
        opacity: 1;
        pointer-events: all;
    }

    @keyframes slideIn {
        from {
            top: 53%;
        }
        to {
            top: 50%;
        }
    }

    section {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        max-width: 312px;
        transform: translate(-50%, -50%);
        background: var(--list-bg);
        border-radius: 10px;
        animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    header {
        padding: 27px 0 26px;
        background: var(--secondary);
        color: var(--secondary-dark);
        border-radius: 10px 10px 0 0;
    }

    header.incoming {
        background: var(--trinary);
        color: var(--trinary-dark);
    }

    header.pending {
        background: var(--pending-header);
        color: var(--pending-dark);
    }

    header h2 {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
    }

    header h2 strong {
        font-weight: 600;
        font-size: 20px;
        line-height: 20px;
    }

    header h2 small {
        font-size: 11px;
        float: left;
        line-height: 11px;
        margin: 1px 0 0 2px;
    }

    header > small {
        font-size: 11px;
        display: block;
        text-align: center;
    }

    article {
        padding: 24px;
        user-select: text;
    }

    article date {
        display: block;
        font-size: 11px;
        font-weight: 600;
        opacity: 0.5;
        margin-bottom: 18px;
    }

    h5 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    p,
    a {
        display: block;
        font-size: 12px;
        margin-bottom: 18px;
    }
    a {
        color: var(--primary);
        cursor: pointer;
    }

    footer {
        padding-top: 10px;
    }
</style>

<svelte:window on:keydown={onkey} />

<popup class:active>
    {#if tx}
        <section>
            <header class:incoming={tx.incoming} class:pending={!tx.persistence}>
                <h2>
                    {#if tx.persistence}
                        <strong>You {tx.incoming ? 'received' : 'sent'} {tx.value.value}</strong>
                    {:else}
                        <strong>{tx.incoming ? 'Receiving' : 'Sending'} {tx.value.value}</strong>
                    {/if}
                    <small>{tx.value.unit}</small>
                </h2>
                <small>{tx.value.fiat}</small>
            </header>
            <article>
                <date>{formatDate(tx.timestamp, 'long')}</date>

                <h5>Bundle hash</h5>
                <a href="https://devnet.thetangle.org/transaction/{tx.hash}" target="_blank">
                    {tx.hash.substr(0, 10)}...{tx.hash.substr(-10)}
                </a>
                {#if tx.receiver}
                    <h5>Recipient</h5>
                    <p>{tx.receiver}</p>
                {/if}

                {#if tx.reference}
                    <h5>Reference</h5>
                    <p>{tx.reference}</p>
                {/if}

                <footer>
                    <Button
                        onClick={() => {
                            active = null
                        }}
                        list
                        label="Done" />
                </footer>
            </article>
        </section>
    {/if}
</popup>
