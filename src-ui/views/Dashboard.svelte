<script>
    import API from '~/lib/api'
    import { goto, formatValue } from '~/lib/helpers'
    import { account, balance, history } from '~/lib/account'
    import { marketPrice } from '~/lib/market'

    import { Button, Chart, Footer, Icon } from '~/components'

    $: balanceDisplay = formatValue($balance, $marketPrice)
</script>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    header {
        text-align: right;
        padding: 18px 17px 16px;
    }
    header button {
        cursor: pointer;
        background: none;
    }

    balance {
        display: block;
        text-align: center;
        margin-bottom: 40px;
    }
    balance h1 {
        position: relative;
        display: inline-block;
        margin: 0 auto 10px;
        font-size: 40px;
        line-height: 40px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
    }

    balance h1 small,
    balance h2 {
        font-size: 13px;
        line-height: 21px;
        font-weight: 500;
    }

    balance h1 small {
        position: absolute;
        top: 2px;
        left: calc(100% + 3px);
    }

    balance h2 {
        margin-bottom: 36px;
    }

    @media only screen and (max-height: 600px) {
        balance h2 {
            margin-bottom: 16px;
        }
    }

    balance div {
        max-width: 186px;
        margin: 0 auto;
    }

    h3 {
        color: var(--chart-title);
        font-size: 14px;
        font-weight: 600;
        text-align: center;
    }
</style>

<main>
    <div>
        <header>
            <button on:click={() => goto('settings')}>
                <Icon icon="settings" hover />
            </button>
        </header>

        <balance>
            <h1>
                {balanceDisplay.rounded}
                <small>{balanceDisplay.unit}</small>
            </h1>
            <h2>{balanceDisplay.fiat}</h2>

            <div>
                <Button
                    disabled={$history.filter((item) => item.hash).length < 1}
                    onClick={() => goto('history')}
                    label="Transaction history"
                    secondary
                    small />
            </div>
        </balance>
    </div>

    <chart>
        <h3>Trading price</h3>
        <Chart />
    </chart>

    <Footer>
        <Button disabled={!$account} onClick={() => goto('request')} label="Request" double />
        <Button disabled={!$balance}  onClick={() => goto('send')} label="Send" double />
    </Footer>
</main>
