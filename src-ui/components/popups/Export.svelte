<script>
    import Popup from './Popup'

    import { seed } from '~/lib/account'
    import { error } from '~/lib/app'
    import createVault from '~/lib/seedVault'

    import { Button, Footer, Icon } from '~/components'

    export let active

    let password1 = ''
    let password2 = ''

    const exportVault = async () => {
        if (password1.length < 6) {
            return error.set('Password too short')
        }
        if (password1 !== password2) {
            return error.set("Password don't match")
        }

        await createVault(password1, $seed)

        active = false
    }
</script>

<style>
    div {
        height: 100%;
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 65px);
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
        padding: 25px 24px;
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

    icon {
        width: 70px;
        display: block;
        margin: 45px auto;
    }
</style>

<Popup bind:active solid>
    <div>
        <header
            on:click={() => {
                active = false
            }}>
            <button>
                <span>Export SeedVault</span>
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
        <section>
            <article>
                <icon>
                    <Icon icon="seedvault" auto />
                </icon>
                <h4>Choose password</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>

                <label>Password</label>
                <input type="password" bind:value={password1} />
                <label>Repeat password</label>
                <input type="password" bind:value={password2} />

            </article>
            <Footer>
                <Button onClick={exportVault} label="Download SeedVault" />
            </Footer>
        </section>
    </div>
</Popup>
