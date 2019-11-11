<script>
    import QRious from 'qrious'

    export let value

    let element

    $: qrCode = element && new QRious({ element, value, backgroundAlpha: 0, size: 160 })
</script>

<style>
    container {
        display: block;
        background: var(--primary-fg);
        width: 100%;
        padding: 30px 0 48px;
        border-radius: 10px;
    }
    qr {
        display: block;
        position: relative;
        width: 204px;
        height: 204px;
        margin: 0 auto;
    }
    h4 {
        font-size: 13px;
        text-align: center;
        margin-bottom: 32px;
    }
    canvas {
        position: absolute;
        top: 22px;
        left: 22px;
    }

    svg {
        position: absolute;
        top: 0px;
        left: 0px;
    }
    svg path {
        fill: var(--bg);
    }
</style>

<container>
    <h4>Share QR</h4>
    <qr>
        <canvas bind:this={element} />
        <svg width="204" height="204" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M167 10V0h26.976c5.523 0 10 4.477 10 10v27h-10V10H167zM36.976 10H10v27H0V10C0 4.477 4.477 0 10 0h26.976v10zM167
                194h26.976v-27h10v27c0 5.523-4.477 10-10 10H167v-10zm-130.024 0v10H10c-5.523 0-10-4.477-10-10v-27h10v27h26.976z" />
        </svg>
    </qr>
</container>
