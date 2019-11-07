<script>
    import { onMount } from 'svelte'
    import Hammer from 'hammerjs'

    import { goto } from '~/lib/helpers'
    import { account, balance } from '~/lib/account'
    import { darkMode } from '~/lib/app'
    import path from '~/lib/router'

    let container
    $: dark = $darkMode === true

    onMount(() => {
        const hammer = new Hammer(document.body)
        hammer.on('swiperight', (ev) => {
            if ($account && $path === '') {
                goto('request')
            } else if ($path === 'send') {
                goto('')
            }
        })

        hammer.on('swipeleft', (ev) => {
            if ($balance && $path === '') {
                goto('send')
            } else if ($path === 'request') {
                goto('')
            }
        })
    })
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600&display=swap');

    main {
        --max-width: 360px;
        --max-height: 640px;

        --bg: #eef1f3;
        --fg: #485776;
        --fg-hover: #2f5a94;
        --primary: #3569d7;
        --primary-fg: #fff;
        --primary-hover: #1454da;
        --secondary: #ffc555;
        --secondary-fg: #fff;
        --secondary-hover: #f3b336;
        --secondary-dark: #615640;
        --trinary: #4cc3ff;
        --trinary-fg: #fff;
        --trinary-dark: #1f5571;
        --light: #c2c7d1;
        --dark: #556273;
        --warning: #ef562d;
        --warning-fg: #fff;
        --warning-hover: #f03f0f;
        --success: #67dab0;
        --input-bg: #fff;
        --input-border: #d1dae2;
        --input-placeholder: #a6adbc;
        --input-carret: #3569d7;
        --popup-bg: rgba(72, 87, 118, 0.8);
        --chart-bg: #d2e9f5;
        --chart-fg: #4cc3ff;
        --chart-title: #87d4fb;
        --chart-button-fg: #fff;
        --chart-button-bg: #ffc555;
        --box-bg: #fff;
        --list-bg: #fff;
        --list-button: #3569d7;
        --hr: #e3e5ec;
        --spinner: #b0b7c4;
        --pending: #c5c5c5;
        --pending-header: #dfdfdf;
        --pending-dark: #4f4f50;
    }
    main.dark {
        --bg: #485776;
        --fg: #fff;
        --primary: #5377c2;
        --primary-fg: #fff;
        --secondary: #fec65a;
        --secondary-fg: #fff;
        --secondary-dark: #615640;
        --trinary: #4cc3ff;
        --trinary-fg: #fff;
        --light: #c2c7d1;
        --dark: #556273;
        --warning: #ef562d;
        --warning-fg: #fff;
        --success: #67dab0;
        --input-bg: #627294;
        --input-border: #717e97;
        --input-placeholder: #b0b8ca;
        --input-carret: #424c62;
        --popup-bg: rgba(72, 87, 118, 0.8);
        --chart-bg: #5a6884;
        --chart-fg: #abb3c0;
        --chart-title: #a3abbb;
        --chart-button-fg: #fff;
        --chart-button-bg: #627294;
        --box-bg: #424c62;
        --list-bg: #627294;
        --list-button: #638ee9;
        --hr: rgba(227, 229, 236, 0.2);
        --spinner: #b0b7c4;
        --pending: #b0b6c4;
        --pending-header: #959eb2;
        --pending-dark: #eef0f4;
    }
    :global(*, *:after, *:before) {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: 400;
        box-sizing: border-box;
        outline: none;
    }
    :global(html, body) {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }
    :global(button) {
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        color: var(--fg);
    }
    :global(input, textarea) {
        margin-bottom: 18px;
        padding: 16px 14px 17px;
        background: var(--input-bg);
        border-radius: 7px;
        border: 1px solid var(--input-border);
        font-family: 'Poppins', sans-serif;
        -webkit-appearance: none;
        color: var(--fg);
        font-size: 13px;
        line-height: 16px;
        width: 100%;
        resize: none;
    }
    :global(::placeholder) {
        color: var(--input-placeholder);
        font-weight: 600;
    }

    :global(h6) {
        color: var(--warning);
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 9px;
    }
    :global(label) {
        display: block;
        font-weight: 600;
        margin-bottom: 7px;
    }
    :global(label span) {
        font-weight: 600;
    }
    :global(svg) {
        overflow: visible;
    }
    main {
        width: 100%;
        height: 100%;
        max-width: var(--max-width);
        max-height: var(--max-height);
        background: var(--bg);
        color: var(--fg);
        user-select: none;
        font-size: 13px;
        line-height: 16px;
        overflow: hidden;
        position: relative;
    }
</style>

<main bind:this={container} class:dark>
    <slot />
</main>
