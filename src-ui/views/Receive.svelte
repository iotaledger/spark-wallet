<script>
    import { onMount } from 'svelte'
    import QRious from 'qrious'
    import API from '~/lib/api'

    import { seed } from '~/lib/state'

    let address
    let qr

    onMount(async () => {
        address = await API.generateAddress({
            seed: $seed,
            index: 0
        })

        qrCode = new QRious({
            element: qr,
            background: '#ffffff',
            value: `iota://${address}`,
            size: 240
        })
    })
</script>

<style>
    p {
        display: block;
        word-break: break-all;
        padding: 20px;
        line-height: 24px;
    }
</style>

<canvas bind:this={qr} />
<p>{address}</p>
