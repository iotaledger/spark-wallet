import { createLink, getIotas } from '../../src-ui/lib/helpers'

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

test('geIotas', () => {
    const sets = [
        {
            params: [2, '$', 99],
            result: 198000000
        },
        {
            params: [2, 'i', 99],
            result: 2
        },
        {
            params: [2, 'Ki', 99],
            result: 2000
        },
        {
            params: [2, 'Mi', 99],
            result: 2000000
        },
        {
            params: [2, 'Gi', 99],
            result: 2000000000
        },
        {
            params: [2, 'Ti', 99],
            result: 2000000000000
        }
    ]

    sets.forEach(({ params, result }) => {
        const value = getIotas(...params)
        expect(value).toBe(result)
    })
})
