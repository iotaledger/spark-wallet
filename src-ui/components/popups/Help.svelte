<script>
    import Popup from './Popup'

    export let active
</script>

<style>
    div {
        height: 100%;
    }

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

    article {
        height: calc(100% - 65px);
        padding: 25px 24px;
    }

    @media (max-height: 660px) {
        article {
            overflow-y: auto;
        }
    }

    h4 {
        font-weight: 600;
        margin-bottom: 10px;
    }

    p {
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

<Popup bind:active solid>
    <div>
        <header
            on:click={() => {
                active = false
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
            <h4>About Payment Requests</h4>
            <p>
                Payment requests are a new way of exchanging IOTA. Simply generate a request and share it with the sender. You can
                add options such as an amount, the sender's name or a transaction note. To complete a payment request, simply scan
                the QR or open the link in your browser. We are trialling payment requests as an alternative IOTA payment
                solution.
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
    </div>
</Popup>
