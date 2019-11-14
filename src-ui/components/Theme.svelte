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
        // Enable swipe gestures on touch devices only
        if (window.matchMedia('(pointer: coarse)').matches) {
            const hammer = new Hammer(document.body)
            hammer.on('swiperight', () => {
                if ($account && $path === '') {
                    goto('request')
                } else if ($path === 'send') {
                    goto('')
                }
            })

            hammer.on('swipeleft', () => {
                if ($balance && $path === '') {
                    goto('send')
                } else if ($path === 'request') {
                    goto('')
                }
            })
        }
    })
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600&display=swap');

    main {
        --max-width: 460px;
        --max-height: 680px;

        --bg: #eef1f3;
        --fg: #485776;
        --fg-hover: #2f5a94;
        --fg-link: #4376e2;
        --primary: #3569d7;
        --primary-fg: #fff;
        --primary-hover: #1454da;
        --secondary: #ffc555;
        --secondary-fg: #fff;
        --secondary-hover: #f3b336;
        --secondary-disabled: #ffdc98;
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
        --input-active: #677ca9;
        --popup-bg: rgba(72, 87, 118, 0.8);
        --chart-bg: #d2e9f5;
        --chart-fg: #4cc3ff;
        --chart-title: #87d4fb;
        --chart-button-fg: #fff;
        --chart-button-bg: #ffc555;
        --box-bg: #fff;
        --list-bg: #fff;
        --hr: #e3e5ec;
        --spinner: #b0b7c4;
        --pending: #c5c5c5;
        --pending-header: #dfdfdf;
        --pending-dark: #4f4f50;
        --dropdown-active: #fff0d2;
        --dropdown-hover: #f4f4f4;
    }
    main.dark {
        --bg: #485776;
        --fg: #fff;
        --fg-hover: #e0e4ec;
        --fg-link: #a9c5ff;
        --primary: #5377c2;
        --primary-fg: #fff;
        --primary-hover: #2a5abd;
        --secondary: #fec65a;
        --secondary-fg: #fff;
        --secondary-dark: #615640;
        --secondary-hover: #f3b336;
        --trinary: #4cc3ff;
        --trinary-fg: #fff;
        --light: #c2c7d1;
        --dark: #556273;
        --warning: #f76c5e;
        --warning-fg: #fff;
        --warning-hover: #f45444;
        --success: #67dab0;
        --input-bg: #627294;
        --input-border: #717e97;
        --input-placeholder: #b0b8ca;
        --input-carret: #424c62;
        --input-active: #b8bfcd;
        --popup-bg: rgba(72, 87, 118, 0.8);
        --chart-bg: #5a6884;
        --chart-fg: #abb3c0;
        --chart-title: #a3abbb;
        --chart-button-fg: #fff;
        --chart-button-bg: #627294;
        --box-bg: #424c62;
        --list-bg: #627294;
        --hr: rgba(227, 229, 236, 0.2);
        --spinner: #b0b7c4;
        --pending: #b0b6c4;
        --pending-header: #959eb2;
        --pending-dark: #eef0f4;
        --dropdown-active: #51689a;
        --dropdown-hover: #5c6f98;
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
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        background: url('/bg.jpg') no-repeat;
        background-size: cover;
    }
    :global(button) {
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        color: var(--fg);
    }
    :global(input, textarea) {
        margin-bottom: 18px;
        padding: 0 14px;
        background: var(--input-bg);
        border-radius: 7px;
        border: 1px solid var(--input-border);
        font-family: 'Poppins', sans-serif;
        -webkit-appearance: none;
        color: var(--fg);
        font-size: 13px;
        width: 100%;
        height: 52px;
        resize: none;
        transition: border-color 0.12s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :global(input:focus) {
        border-color: var(--input-active);
    }

    @media only screen and (max-height: 600px) {
        :global(input, textarea) {
            margin-bottom: 16px;
            height: 44px;
        }
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
        min-height: 560px;
        background: var(--bg);
        color: var(--fg);
        user-select: none;
        font-size: 13px;
        line-height: 16px;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 20px 30px 5px rgba(0, 0, 0, 0.25);
    }

    @media only screen and (max-height: 560px) {
        :global(html, body) {
            display: block;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        main {
            display: block;
            margin: 0 auto;
        }
    }
</style>

<main bind:this={container} class:dark>
    <slot />
</main>
