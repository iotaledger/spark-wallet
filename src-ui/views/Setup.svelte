<script>
    import API from '~/lib/api'
    import { generateSeed } from '~/lib/helpers'
    import { seed } from '~/lib/account'

    import { Berny, Button, Footer, Icon } from '~/components'

    async function setSeed() {
        try {
            const secret = generateSeed()
            await API.setSecret({ secret })
            seed.set(secret)
        } catch (err) {
            console.error(err)
        }
    }
</script>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 60px 0 0;
    }

    @media only screen and (max-height: 600px) {
        main {
            padding-top: 40px;
        }
    }

    article {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }
    article div {
        padding-left: 24px;
    }

    p {
        font-size: 12px;
        line-height: 18px;
    }
</style>

<main>
    <Icon icon="logo-spark" />

    <Berny size={162} />

    <Footer tooltip>
        <article>
            <Icon icon="warning" warning />
            <div>
                <h6>Warning</h6>
                <p>Spark is a low-security wallet intended for short-term use and to send small amounts of IOTA only.</p>
            </div>
        </article>
        <Button onClick={setSeed} label="Generate wallet" />
    </Footer>
</main>
