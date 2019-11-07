<script>
    import { goto } from '~/lib/helpers'

    import { Icon } from '~/components'

    export let label
    export let help
    export let secondary

    let popup = false
</script>

<style>
    header {
        display: flex;
        position: relative;
        width: 100%;
    }

    button:first-of-type {
        display: flex;
        align-items: center;
        width: 100%;
        height: 65px;
        background: var(--primary);
        color: var(--primary-fg);
        padding: 0 20px;
        font-size: 16px;
    }

    button.right {
        position: absolute;
        top: 5px;
        right: 0px;
        width: 61px;
        height: 60px;
        background: none;
    }

    button span {
        flex: 1;
        text-align: center;
        padding-right: 23px;
        font-weight: 600;
    }

    popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        max-width: var(--max-width);
        max-height: var(--max-height);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background: var(--bg);
        z-index: 3;
        pointer-events: none;
        transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    }
    popup.active {
        opacity: 1;
        pointer-events: all;
    }
    article {
        padding: 25px 24px;
    }

    h4 {
        font-weight: 600;
        margin-bottom: 10px;
    }

    popup p {
        margin-bottom: 25px;
        font-size: 12px;
        line-height: 18px;
    }

    li {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        border-bottom: 1px solid var(--hr);
    }

    li:last-of-type {
        border-bottom: none;
    }

    li strong {
        color: var(--primary);
        font-weight: 600;
        width: 30px;
    }

    li span {
        text-align: left;
        width: 110px;
    }

    li span:last-of-type {
        text-align: right;
        width: 130px;
    }
</style>

<header>
    <button on:click={() => goto('')}>
        {#if !secondary}
            <Icon icon="back" primary />
        {/if}
        <span>{label}</span>
    </button>
    {#if secondary}
        <button class="right" on:click={() => goto('')}>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.279 7.339L.53 1.59a.75.75 0 111.06-1.06L7.34 6.277 13.087.53a.75.75 0 011.06 1.06L8.4 7.34l5.75
                    5.75a.75.75 0 11-1.06 1.06L7.34 8.4l-5.75 5.75a.75.75 0 01-1.061-1.06l5.75-5.75z"
                    fill="#FFF"
                    fill-rule="nonzero" />
            </svg>
        </button>
    {/if}
    {#if help}
        <button
            on:click={() => {
                popup = true
            }}
            class="right">
            <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8" stroke="#fff" stroke-width="2" />
                <path fill="#fff" d="M8 8h2v5H8z" />
                <circle cx="9" cy="6" r="1" fill="#fff" />
            </svg>
        </button>
    {/if}
</header>

<popup class:active={popup}>
    <header
        on:click={() => {
            popup = false
        }}>
        <button>
            <span>Help</span>
        </button>
        <button class="right">
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.279 7.339L.53 1.59a.75.75 0 111.06-1.06L7.34 6.277 13.087.53a.75.75 0 011.06 1.06L8.4 7.34l5.75
                    5.75a.75.75 0 11-1.06 1.06L7.34 8.4l-5.75 5.75a.75.75 0 01-1.061-1.06l5.75-5.75z"
                    fill="#FFF"
                    fill-rule="nonzero" />
            </svg>
        </button>
    </header>
    <article>
        <h4>About CDAs</h4>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Aenean euismod bibendum
            laoreet ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet
        </p>
        <h4>How they work</h4>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet .Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean euismod bibendum laoreet
        </p>
        <h4>IOTA units</h4>
        <p>IOTAs are typically acquired in multiples of one million, but can be transferred as a single IOTA</p>

        <ul>
            <li>
                <strong>Ti</strong>
                <span>Trillion</span>
                <span>1 000 000 000 000</span>
            </li>
            <li>
                <strong>Gi</strong>
                <span>Billion</span>
                <span>1 000 000 000</span>
            </li>
            <li>
                <strong>Mi</strong>
                <span>Million</span>
                <span>1 000 000</span>
            </li>
            <li>
                <strong>Ki</strong>
                <span>Thousand</span>
                <span>1000</span>
            </li>
            <li>
                <strong>i</strong>
                <span>One</span>
                <span>1</span>
            </li>
        </ul>
    </article>
</popup>
