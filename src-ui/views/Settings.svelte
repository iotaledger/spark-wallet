<script>
    import { generatePersistenceID } from '@iota/persistence'
    import { trytesToTrits } from '@iota/converter'

    import { Button, Dropdown, Footer, Header, Icon, Tabs, Toggle } from '~/components'
    import { account, seed } from '~/lib/account'
    import { darkMode } from '~/lib/app'

    const destroyWallet = () => {
        try {
            const dbID = generatePersistenceID(trytesToTrits($seed))

            if ($account) {
                $account.stop()
            }

            const deleteRequest = window.indexedDB.deleteDatabase(dbID)

            deleteRequest.onsuccess = () => {
                localStorage.clear()
                sessionStorage.clear()
                location.hash = ''
                location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    let tabs = ['Basic', 'Advanced', 'Wallet']
    let tab = 'Basic'
</script>

<style>
    main {
        flex: 1;
        flex-direction: column;
        padding: 28px 20px;
    }

    hr {
        display: block;
        width: calc(100% + 40px);
        height: 1px;
        margin: 0 0 18px -20px;
        background: var(--hr);
    }

    label.inline {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    main > p {
        font-size: 12px;
        margin-bottom: 24px;
    }

    article {
        display: flex;
        padding: 12px 15px 24px;
    }

    article icon {
        margin-top: 10px;
    }

    article div {
        padding-left: 28px;
    }

    article p {
        font-size: 12px;
        line-height: 18px;
    }
</style>

<Header label="Settings" secondary />

<Tabs {tabs} bind:tab />

{#if tab === 'Basic'}
    <main>
        <label>Language</label>
        <Dropdown value="English" flag="uk" />

        <label>Currency</label>
        <Dropdown value="US Dollars" flag="us" />
        <hr />

        <label class="inline">
            <span>Dark mode</span>
            <span>
                <Toggle on={darkMode} />
            </span>
        </label>
        <p>Visual theme optimised for night time use</p>
        <hr />
    </main>
{/if}
{#if tab === 'Advanced'}
    <main>
        <label>Set node</label>
        <input type="text" value="https://wallet2.iota.town:443" />
    </main>
{/if}
{#if tab === 'Wallet'}
    <main />
    <Footer tooltip>
        <article>
            <icon>
                <Icon icon="warning" warning />
            </icon>
            <div>
                <h6>BURN YOUR WALLET</h6>
                <p>
                    You can destroy this wallet, but you will lose access to your tokens and transaction history.
                    <br />
                    Be sure to back up your wallet before proceeding, otherwise your tokens will be unrecoverable.
                </p>
            </div>
        </article>
        <Button onClick={destroyWallet} warning label="Destroy this wallet" />
    </Footer>
{/if}
