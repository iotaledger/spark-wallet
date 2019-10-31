<script>
    import { onMount } from 'svelte'

    import { seed } from '~/lib/account'
    import { fetchMarketData } from '~/lib/market'
    import API from '~/lib/api'

    import { Notification, Route, Theme } from '~/components'

    import Splash from '~/views/Splash'
    import Setup from '~/views/Setup'
    import Dashboard from '~/views/Dashboard'
    import Send from '~/views/Send'
    import Request from '~/views/Request'
    import Settings from '~/views/Settings'
    import History from '~/views/History'

    let splash = true

    onMount(async () => {
        // Initiate wallet with a seed from  persistent storage
        try {
            const secret = await API.getSecret()
            if (typeof secret === 'string' && secret.length === 81) {
                seed.set(secret)
            }
        } catch (err) {
            console.error(err)
        }

        fetchMarketData()

        setTimeout(() => {
            splash = false
        }, 2000)
    })
</script>

<Theme>
    <Notification />
    {#if splash}
        <Route route="/">
            <Splash />
        </Route>
    {:else}
        <Route route="/" primary>
            {#if $seed}
                <Dashboard />
            {:else}
                <Setup />
            {/if}
        </Route>
        <Route route="/send">
            <Send />
        </Route>
        <Route route="/request">
            <Request />
        </Route>
        <Route route="/settings">
            <Settings />
        </Route>
        <Route route="/history">
            <History />
        </Route>
    {/if}
</Theme>
