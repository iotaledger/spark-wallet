import { createLink } from '../../src-ui/lib/helpers'

test('createLink', () => {
    const sets = [
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar', 'Baz'],
            url: 'iota://FOO?timeoutAt=100000000&message=Foo%20Bar&amount=1000000&receiver=Baz'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar'],
            url: 'iota://FOO?timeoutAt=100000000&message=Foo%20Bar&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi'],
            url: 'iota://FOO?timeoutAt=100000000&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }],
            url: 'iota://FOO?timeoutAt=100000000'
        },
        {
            params: [],
            url: null
        }
    ]

    sets.forEach(({ params, url }) => {
        const link = createLink(...params)
        expect(link).toBe(url)
    })
})
