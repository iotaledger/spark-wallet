import { createLink, getIotas } from '../../src-ui/lib/helpers'

test('createLink', () => {
    const sets = [
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar', 'Baz'],
            url: 'http://localhost/?address=FOO&timeoutAt=100000000&message=Foo%20Bar&amount=1000000&receiver=Baz'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar'],
            url: 'http://localhost/?address=FOO&timeoutAt=100000000&message=Foo%20Bar&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi'],
            url: 'http://localhost/?address=FOO&timeoutAt=100000000&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }],
            url: 'http://localhost/?address=FOO&timeoutAt=100000000'
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
            params: [2, '$', { value: 99, currency: 'USD' }],
            result: 198000000
        },
        {
            params: [2, 'i', { value: 99, currency: 'USD' }],
            result: 2
        },
        {
            params: [2, 'Ki', { value: 99, currency: 'USD' }],
            result: 2000
        },
        {
            params: [2, 'Mi', { value: 99, currency: 'USD' }],
            result: 2000000
        },
        {
            params: [2, 'Gi', { value: 99, currency: 'USD' }],
            result: 2000000000
        },
        {
            params: [2, 'Ti', { value: 99, currency: 'USD' }],
            result: 2000000000000
        }
    ]

    sets.forEach(({ params, result }) => {
        const value = getIotas(...params)
        expect(value).toBe(result)
    })
})
