<script>
    import { onDestroy } from 'svelte'
    import { Plugins } from '@capacitor/core'
    import { address, receiver, setAddress } from '~/lib/account'
    import { getIotas, createLink, getTimeUnits, setClipboard } from '~/lib/helpers'

    import { Amount, Footer, Header, Button } from '~/components'
    import { notification } from '~/lib/app'
    import { QR } from '~/components'

    import Berny from '~/assets/Berny'

    const { Clipboard } = Plugins

    let amount = null
    let unit = 'Mi'
    let reference = ''
    let loading = false
    let timer
    let time = 0

    $: startTimer($address)

    $: link = createLink($address, amount, unit, reference, $receiver)

    function startTimer(data) {
        if (!data) {
            return
        }

        time = Math.abs((new Date($address.timeoutAt * 1000).getTime() - new Date().getTime()) / 1000)

        clearInterval(timer)
        timer = setInterval(() => {
            time--
        }, 1000)
    }

    function generate() {
        loading = true
        setAddress(getIotas(amount, unit), reference)
    }

    async function copyAddress() {
        Clipboard.write({
            string: link
        })
        notification.set('Link copied to clipboard')
    }

    onDestroy(() => {
        clearInterval(timer)
        address.set(null)
    })
</script>

<style>
    main {
        flex: 1;
        padding: 40px 20px 0;
    }

    icon {
        display: block;
        width: 100px;
        margin: -10px auto 5px;
    }

    @media only screen and (max-height: 600px) {
        icon {
            width: 80px;
        }
    }

    p {
        text-align: center;
        margin-bottom: 20px;
    }

    h5 {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 14px;
        text-align: center;
    }
    h3 {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 26px;
    }
    h3 strong {
        font-size: 28px;
        line-height: 28px;
        font-weight: 600;
    }
    h3 small {
        font-size: 13px;
        line-height: 14px;
        font-weight: 600;
        margin: 0 8px 1px 2px;
    }
</style>

<Header label="Request a payment" help />

{#if !$address}
    <main>
        <icon>
            <Berny />
        </icon>
        <label>Amount</label>
        <Amount bind:amount bind:unit />

        <label>From</label>
        <input placeholder="John Doe" type="text" bind:value={$receiver} />

        <label>Transaction note</label>
        <input placeholder="Optional reference" type="text" bind:value={reference} />
    </main>

    <Footer tooltip>
        <p>Your request will be valid for 24 hours</p>
        <Button onClick={generate} {loading} label="Generate request" loadingLabel="Generating ..." />
    </Footer>
{:else}
    <main>
        <h5>Valid for</h5>
        <h3>
            <strong>{getTimeUnits(time, 'h')}</strong>
            <small>h</small>
            <strong>{getTimeUnits(time, 'm')}</strong>
            <small>m</small>
            <strong>{getTimeUnits(time, 's')}</strong>
            <small>s</small>
        </h3>
        <QR value={link} />
    </main>

    <Footer>
        <Button onClick={copyAddress} label="Copy shareable link" />
    </Footer>
{/if}
