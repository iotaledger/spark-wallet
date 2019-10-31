<style>
    /*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
    spinner,
    spinner > div {
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    spinner {
        display: block;
        margin: 0 auto 24px;
    }

    spinner > div {
        display: inline-block;
        background: var(--spinner);
    }
    spinner {
        width: 64px;
        height: 64px;
    }

    spinner > div {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        margin-left: -8px;
        border-radius: 100%;
        animation: ball-spin 2s infinite ease-out;
    }
    spinner > div:nth-child(1) {
        top: 5%;
        left: 50%;
        animation-delay: -2.25s;
    }
    spinner > div:nth-child(2) {
        top: 18.1801948466%;
        left: 81.8198051534%;
        animation-delay: -2.5s;
    }
    spinner > div:nth-child(3) {
        top: 50%;
        left: 95%;
        animation-delay: -2.75s;
    }
    spinner > div:nth-child(4) {
        top: 81.8198051534%;
        left: 81.8198051534%;
        animation-delay: -3s;
    }
    spinner > div:nth-child(5) {
        top: 94.9999999966%;
        left: 50.0000000005%;
        animation-delay: -3.25s;
    }
    spinner > div:nth-child(6) {
        top: 81.8198046966%;
        left: 18.1801949248%;
        animation-delay: -3.5s;
    }
    spinner > div:nth-child(7) {
        top: 49.9999750815%;
        left: 5.0000051215%;
        animation-delay: -3.75s;
    }
    spinner > div:nth-child(8) {
        top: 18.179464974%;
        left: 18.1803700518%;
        animation-delay: -4s;
    }

    @keyframes ball-spin {
        0%,
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 0;
            -webkit-transform: scale(0);
            -moz-transform: scale(0);
            -o-transform: scale(0);
            transform: scale(0);
        }
    }
</style>

<spinner>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
</spinner>
