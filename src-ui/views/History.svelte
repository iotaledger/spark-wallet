<script>
    import { history } from '~/lib/account'
    import { marketPrice } from '~/lib/market'
    import { formatDate, formatValue } from '~/lib/helpers'

    import { Header, Transaction, Tabs } from '~/components'

    $: items = setItems($history, tab)

    let selectedHash = null
    $: selected = items.find((item) => item.hash === selectedHash)

    const setItems = () => {
        const filtered =
            tab === 'All'
                ? $history.filter((item) => item.hash)
                : $history.filter(
                      (item) => item.hash && ((tab === 'Sent' && !item.incoming) || (tab === 'Received' && item.incoming))
                  )

        filtered.sort((a, b) => b.timestamp - a.timestamp)

        let currentDay = null

        return filtered.map((item, index) => {
            const txDay = item.timestamp - (item.timestamp % (24 * 60 * 60))
            const day = txDay !== currentDay ? txDay : null
            currentDay = txDay
            return Object.assign({}, item, { day, value: formatValue(item.value, $marketPrice) })
        })
    }

    let tabs = ['All', 'Sent', 'Received']
    let tab = 'All'
</script>

<style>
    main {
        flex: 1;
        flex-direction: column;
        padding: 0 20px;
        overflow-y: auto;
    }

    main.empty {
        text-align: center;
        padding-top: 150px;
        font-size: 14px;
    }

    main:before {
        display: block;
        position: absolute;
        top: 185px;
        left: 35px;
        content: '';
        width: 2px;
        height: calc(100% - 165px);
        background: var(--list-bg);
    }

    main.empty:before {
        display: none;
    }

    date {
        font-size: 11px;
        display: block;
        text-align: center;
        margin: 26px 0 15px;
    }

    item {
        display: block;
        cursor: pointer;
        padding: 6px 0 0 48px;
        position: relative;
    }

    item:before {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        background: var(--secondary);
    }

    item.incoming:before {
        background: var(--trinary);
    }

    item.pending:before {
        background: var(--pending);
    }

    svg {
        position: absolute;
        z-index: 2;
        top: 11px;
        left: 9px;
    }

    svg:last-of-type {
        display: none;
        top: 7px;
        left: 7px;
    }

    svg path {
        fill: var(--primary-fg);
    }

    item.incoming svg path {
        transform: rotate(180deg) translate(0, -2px);
        transform-origin: center center;
    }

    item.pending svg:first-of-type {
        display: none;
    }

    item.pending svg:last-of-type {
        display: block;
    }

    item.pending svg path {
        transform: none;
    }

    h5 {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 9px 4px;
    }

    article {
        position: relative;
        background: var(--list-bg);
        border-radius: 10px;
        padding: 17px 10px 13px 16px;
        margin-bottom: 17px;
        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    item:hover article {
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
    }

    strong {
        display: flex;
        margin-bottom: 13px;
    }
    strong em {
        font-style: normal;
        font-size: 20px;
        font-weight: 600;
    }
    strong span {
        font-size: 11px;
        line-height: 11px;
        margin-left: 3px;
    }
    small {
        font-size: 11px;
    }
    time {
        font-size: 11px;
        position: absolute;
        top: 14px;
        right: 15px;
        font-weight: 600;
        opacity: 0.4;
    }
</style>

<Header label="Transaction history" secondary />

<Tabs {tabs} bind:tab />

<main class:empty={items.length === 0}>
    <Transaction bind:active={selectedHash} tx={selected} />
    {#if items.length === 0}
        <p>You haven’t {tab === 'Sent' ? 'sent' : 'made'} any transactions yet</p>
    {/if}
    {#each items as tx}
        {#if tx.day}
            <date>{formatDate(tx.day, 'short')}</date>
        {/if}
        <item
            on:click={() => {
                selectedHash = tx.hash
            }}
            class:incoming={tx.incoming}
            class:pending={!tx.persistence}>
            <svg width="14" height="8" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.055 0L14 6.459l-1.563 1.453-5.382-5.006L1.563 8 0 6.547z" />
            </svg>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5a1 1 0 112 0v3h2a1 1 0 110 2H9a1 1 0 01-1-1V5z" />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 9A9 9 0 110 9a9 9 0 0118 0zm-2 0A7 7 0 112 9a7 7 0 0114 0z" />
            </svg>
            <h5>
                {tx.persistence ? (tx.incoming ? 'Received' : 'Sent') : tx.incoming ? 'Receiving' : 'Sending'}
                {tx.locked ? 'locked' : ''}
            </h5>
            <article>
                <strong>
                    <em>{tx.value.rounded}</em>
                    <span>{tx.value.unit}</span>
                </strong>
                <small>{tx.value.fiat}</small>
                <time>{formatDate(tx.timestamp, 'time')}</time>
            </article>
        </item>
    {/each}
</main>
