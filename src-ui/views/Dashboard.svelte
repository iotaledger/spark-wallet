<script>
    import { onMount } from 'svelte'
    import API from '~/lib/api'
    import { error, backupReminder, showNotifications } from '~/lib/app'
    import { goto, formatValue, parseLink } from '~/lib/helpers'
    import { account, balance, history, setAddress } from '~/lib/account'
    import { marketPrice } from '~/lib/market'

    import { Backup, Button, Chart, Export, Footer, Icon } from '~/components'

    let showExport = false

    $: balanceDisplay = formatValue($balance, $marketPrice)

    $: checkPaymentLink($balance)

    const setFaucetAddress = async (id) => {
        const { address } = await setAddress(null, '')
        const response = await fetch('https://iota-meetup-faucet.now.sh', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address,
                id
            })
        })
    }

    const checkPaymentLink = ($balance) => {
        const cda = parseLink()

        try {
            const id = new URLSearchParams(window.location.search).get('id')
            if (id && id.length) {
                setFaucetAddress(id)
            }
        } catch (err) {
            console.log(err)
        }

        if ($balance === 0 || !cda || cda.expectedAmount > $balance) {
            window.history.pushState('Dashboard', null, '/')
        } else {
            goto('pay')
        }
    }

    onMount(() => {
        if ($showNotifications && typeof Notification === 'function' && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    })
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

{#if $backupReminder}
    <Backup bind:showExport />
{/if}

{#if showExport}
    <Export bind:active={showExport} />
{/if}

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
                <Button onClick={() => goto('history')} label="Transaction history" secondary small />
            </div>
        </balance>
    </div>

    <chart>
        <h3>Trading price</h3>
        <Chart />
    </chart>

    <Footer>
        <Button disabled={!$account} onClick={() => goto('request')} label="Request" double />
        <Button onClick={() => goto('pay')} label="Pay" double />
    </Footer>
</main>
