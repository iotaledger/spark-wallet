<script>
    import { onMount } from 'svelte'
    import QRCode from 'qrcode'

    export let value

    let qr = null

    onMount(async () => {
        qr = await QRCode.toString(value, {
            type: 'svg',
            width: 190,
            height: 190,
            color: {
                dark: '#000',
                light: '#fff'
            }
        })
    })
</script>

<style>
    container {
        display: block;
        background: var(--box-bg);
        width: 100%;
        padding: 30px 0;
        border-radius: 10px;
    }
    qr {
        display: block;
        position: relative;
        width: 204px;
        height: 204px;
        margin: 0 auto;
    }

    svg,
    div {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    div {
        top: 7px;
        left: 7px;
    }

    svg path {
        fill: var(--bg);
    }
</style>

<container>
    <qr>
        <div>
            {@html qr}
        </div>
        <svg width="204" height="204" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M167 10V0h26.976c5.523 0 10 4.477 10 10v27h-10V10H167zM36.976 10H10v27H0V10C0 4.477 4.477 0 10 0h26.976v10zM167
                194h26.976v-27h10v27c0 5.523-4.477 10-10 10H167v-10zm-130.024 0v10H10c-5.523 0-10-4.477-10-10v-27h10v27h26.976z" />
        </svg>
    </qr>
</container>
