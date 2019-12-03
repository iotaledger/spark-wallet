<script>
    import { Capacitor, Plugins } from '@capacitor/core'

    import QrScanner from 'qr-scanner'
    QrScanner.WORKER_PATH = '/scanner.worker.min.js'

    import { onMount } from 'svelte'

    import { formatValue, goto, parseLink, getIotas, getPlatform } from '~/lib/helpers'
    import { account, balance, history, sendState } from '~/lib/account'
    import { marketPrice } from '~/lib/market'
    import { notification, error } from '~/lib/app'

    import { Address, Amount, Berny, Button, Footer, Header, Spinner } from '~/components'

    $: currentBalance = formatValue($balance)

    let cda = null

    let amount = null
    let reference = ''
    let unit = 'Mi'

    let video
    let scanner
    let camera
    let cameraError = false

    let paymentLink = ''

    const onSend = async () => {
        try {
            const value = getIotas(amount, unit, $marketPrice)

            if (!value) {
                return error.set('Cannot send payment without value')
            }

            if (value > $balance) {
                return error.set('Insufficient funds')
            }

            sendState.set('sending')

            const data = {
                address: cda.address,
                timeoutAt: cda.timeoutAt,
                value
            }

            if (cda.expectedAmount) {
                data['expectedAmount'] = cda.expectedAmount
            }

            await $account.sendToCDA(data)

            history.update(($history) =>
                $history.concat([{ address: cda.address.substr(0, 81), reference, receiver: cda.receiver, incoming: false }])
            )
        } catch (err) {
            error.set(err.message || err)
            sendState.set('idle')
        }
    }

    const onPaste = (e) => {
        const data = (event.clipboardData || window.clipboardData).getData('text')
        const result = parseLink(data)
        if (result) {
            setCDA(result)
        }
    }

    const onPaymentLink = () => {
        const result = parseLink(paymentLink)
        if (result) {
            setCDA(result)
        } else {
            error.set('Invalid payment link')
        }
    }

    const resetSend = () => {
        sendState.set('idle')
        goto('')
    }

    const setCDA = (result) => {
        cda = result

        if (result.expectedAmount) {
            const value = formatValue(result.expectedAmount)
            amount = value.value
            unit = value.unit
        }

        reference = result.reference || ''
    }

    const scannerWeb = (stream) => {
        try {
            if (!navigator.getUserMedia) {
                cameraError = true
            } else {
                navigator.getUserMedia(
                    { video: true, audio: false },
                    (stream) => {
                        stream.getTracks().forEach((track) => track.stop())
                        scanner = new QrScanner(video, (data) => {
                            const result = parseLink(data)
                            if (result) {
                                setCDA(result)
                                scanner.destroy()
                                scanner = null
                            }
                        })
                        scanner.start()
                    },
                    (err) => {
                        error.set(`Camera: ${err.message || err}`)
                        cameraError = true
                    }
                )
            }
        } catch (err) {
            cameraError = true
        }
    }

    const scannerMobile = async (init) => {
        if (typeof init === 'boolean') {
            try {
                const { CameraPreview } = Plugins
                camera = CameraPreview

                await camera.start({ position: 'rear' })
            } catch (err) {
                error.set(`Camera: ${err.message || err}`)
                cameraError = true
            }
        }

        try {
            if (camera) {
                const capture = await camera.capture()
                const img = new Image()
                img.src = `data:image/jpeg;base64,${capture.value}`

                const data = await QrScanner.scanImage(img)
                const result = parseLink(data)

                if (result) {
                    setCDA(result)
                    camera.stop()
                    camera = null
                } else {
                    requestAnimationFrame(scannerMobile)
                }
            }
        } catch (err) {
            requestAnimationFrame(scannerMobile)
        }
    }

    onMount(() => {
        sendState.set('idle')

        if (Capacitor.getPlatform() === 'web') {
            scannerWeb()
        } else {
            scannerMobile(true)
        }

        return () => {
            if (camera) {
                camera.stop()
                camera = null
            }
            if (scanner) {
                scanner.destroy()
                scanner = null
            }
        }
    })
</script>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 20px 0;
    }

    main.center {
        align-items: center;
        justify-content: center;
    }

    balance {
        line-height: 55px;
        background: var(--trinary);
        color: var(--trinary-fg);
        text-align: center;
        font-size: 15px;
        font-weight: 600;
    }

    scanner {
        flex: 1;
        position: relative;
        background: #000;
        overflow: hidden;
        opacity: 0;
    }

    scanner.enabled {
        opacity: 1;
    }

    logo {
        display: block;
        text-align: center;
    }

    video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scaleX(-1) !important;
        height: 100%;
    }

    scanner svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    svg path {
        fill: var(--secondary);
    }

    form {
        width: 100%;
    }

    h4 {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }
    h4 strong {
        font-size: 40px;
        line-height: 44px;
        font-weight: 400;
    }
    h4 small {
        font-size: 13px;
        line-height: 13px;
        margin: 4px 0 0 3px;
    }
    receiver {
        display: block;
        text-align: center;
    }

    main.center p {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        text-align: center;
    }

    main.center svg {
        margin-bottom: 24px;
    }

    main.center svg path {
        fill: var(--success);
    }
</style>

<svelte:window on:paste={onPaste} />

{#if $sendState === 'sending'}
    <main class="center">
        <Spinner />
        <p>Your payment is being processed, please wait...</p>
    </main>
{:else if $sendState === 'done'}
    <main class="center">
        <svg width="68" height="68" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M48.218 20.863c1.16-1.159 3.169-1.159 4.328 0a3.079 3.079 0 010 4.405L30.677
                47.136c-.618.618-1.39.864-2.163.864-.773 0-1.546-.246-2.164-.864L15.377 36.241a3.079 3.079 0 010-4.405 3.079 3.079
                0 014.405 0l8.732 8.732 19.704-19.704zM34 68C15.222 68 0 52.778 0 34S15.222 0 34 0s34 15.222 34 34-15.222 34-34
                34zm0-6c15.464 0 28-12.536 28-28S49.464 6 34 6 6 18.536 6 34s12.536 28 28 28z" />
        </svg>
        <p>Your payment is complete</p>
    </main>
    <Footer>
        <Button onClick={resetSend} label="OK" />
    </Footer>
{:else}
    <Header label="Send a payment" />
    <balance>Current balance: {currentBalance.rounded} {currentBalance.unit}</balance>
    {#if !cda}
        {#if cameraError}
            <main class="center">
                <form>
                    <label>Payment link</label>
                    <input placeholder="iota://ABCDEFGH" type="text" bind:value={paymentLink} />
                </form>
            </main>
            <Footer>
                <Button disabled={paymentLink.length === 0} onClick={onPaymentLink} label="Send" />
            </Footer>
        {:else}
            <scanner class:enabled={scanner}>
                <video bind:this={video} autoplay playsinline />
                <svg width="204" height="204" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M167 10V0h26.976c5.523 0 10 4.477 10 10v27h-10V10H167zM36.976 10H10v27H0V10C0 4.477 4.477 0 10
                        0h26.976v10zM167 194h26.976v-27h10v27c0 5.523-4.477 10-10 10H167v-10zm-130.024 0v10H10c-5.523
                        0-10-4.477-10-10v-27h10v27h26.976z" />
                </svg>
            </scanner>
        {/if}
    {:else}
        <main>
            <div />
            <logo>
                <Berny size={120} />
            </logo>
            <div>
                {#if cda && cda.expectedAmount}
                    <h4>
                        <strong>{amount}</strong>
                        <small>{unit}</small>
                    </h4>
                {/if}
                <receiver>{`To ${cda && cda.receiver ? cda.receiver : 'anonymous recipient'}`}</receiver>
            </div>
            <form>
                {#if !cda || !cda.expectedAmount}
                    <label>Amount</label>
                    <Amount bind:amount bind:unit />
                {/if}

                <label>Transaction note</label>
                <input placeholder="Optional reference" type="text" bind:value={reference} />
            </form>
        </main>

        <Footer>
            <Button onClick={onSend} label="Send" />
        </Footer>
    {/if}
{/if}
