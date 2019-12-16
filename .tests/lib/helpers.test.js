import {
    createLink,
    formatDate,
    formatValue,
    generateSeed,
    getIotas,
    getTimeUnits,
    goto,
    parseLink
} from '../../src-ui/lib/helpers'

test('createLink', () => {
    const sets = [
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar', 'Baz'],
            result: 'http://localhost/?address=FOO&timeoutAt=100000000&message=Foo%20Bar&amount=1000000&receiver=Baz'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi', 'Foo Bar'],
            result: 'http://localhost/?address=FOO&timeoutAt=100000000&message=Foo%20Bar&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }, 1, 'Mi'],
            result: 'http://localhost/?address=FOO&timeoutAt=100000000&amount=1000000'
        },
        {
            params: [{ address: 'FOO', timeoutAt: 100000000 }],
            result: 'http://localhost/?address=FOO&timeoutAt=100000000'
        },
        {
            params: [],
            result: null
        }
    ]

    sets.forEach(({ params, result }) => {
        const output = createLink(...params)
        expect(output).toBe(result)
    })
})

test('parseLink', () => {
    const sets = [
        {
            params:
                'http://localhost/?address=FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ&timeoutAt=100000000&message=Foo%20Bar&amount=1000000&receiver=Baz',
            result: {
                address: 'FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ',
                reference: 'Foo Bar',
                expectedAmount: 1000000,
                timeoutAt: 100000000,
                receiver: 'Baz'
            }
        },
        {
            params:
                'http://localhost/?address=FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ&timeoutAt=100000000&amount=1000000&receiver=Baz',
            result: {
                address: 'FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ',
                reference: null,
                expectedAmount: 1000000,
                timeoutAt: 100000000,
                receiver: 'Baz'
            }
        },
        {
            params:
                'http://localhost/?address=FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ&timeoutAt=100000000&amount=1000000',
            result: {
                address: 'FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ',
                reference: null,
                expectedAmount: 1000000,
                timeoutAt: 100000000,
                receiver: null
            }
        },
        {
            params:
                'http://localhost/?address=FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ&timeoutAt=100000000',
            result: null
        },
        {
            params: 'http://localhost/?timeoutAt=100000000',
            result: null
        },
        {
            params:
                'http://localhost/?address=FOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZFOOBARBAZ',
            result: null
        }
    ]

    sets.forEach(({ params, result }) => {
        const output = parseLink(params)
        expect(output).toStrictEqual(result)
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
        const output = getIotas(...params)
        expect(output).toBe(result)
    })
})

test('formatValue', () => {
    const sets = [
        {
            params: [3000000, { value: 2, currency: 'USD' }],
            result: {
                value: 3,
                rounded: '3',
                unit: 'Mi',
                fiat: '$6.00'
            }
        },
        {
            params: [3005000, { value: 2, currency: 'USD' }],
            result: {
                value: 3.005,
                rounded: '3+',
                unit: 'Mi',
                fiat: '$6.01'
            }
        },
        {
            params: [300000005, { value: 2, currency: 'USD' }],
            result: {
                value: 300.000005,
                rounded: '300+',
                unit: 'Mi',
                fiat: '$600.00001'
            }
        },
        {
            params: [300000005, { value: 0.2, currency: 'USD' }],
            result: {
                value: 300.000005,
                rounded: '300+',
                unit: 'Mi',
                fiat: '$60.00'
            }
        },
        {
            params: [30, { value: 2, currency: 'USD' }, 'Mi'],
            result: {
                value: 30,
                rounded: '30',
                unit: 'Mi',
                fiat: '$60.00'
            }
        },
        {
            params: [3500, { value: 2, currency: 'USD' }, 'Mi'],
            result: {
                value: 3.5,
                rounded: '3.5',
                unit: 'Gi',
                fiat: '$7,000.00'
            }
        },
        {
            params: [0, { value: 2, currency: 'USD' }, 'Ti'],
            result: {
                value: 0,
                rounded: '0',
                unit: 'i',
                fiat: '$0.00'
            }
        }
    ]

    sets.forEach(({ params, result }) => {
        const output = formatValue(...params)
        expect(output).toStrictEqual(result)
    })
})

test('goto', () => {
    const sets = [
        {
            params: '/FOO',
            result: '#/FOO'
        },
        {
            params: '/',
            result: '#/'
        },
        {
            params: '',
            result: ''
        }
    ]

    sets.forEach(({ params, result }) => {
        goto(params)
        expect(window.location.hash).toBe(result)
    })
})

test('generateSeed', () => {
    global.crypto = {
        getRandomValues: (bytes) => Array.from(Array(bytes.length), (_, i) => i)
    }

    const seed = generateSeed()
    expect(seed).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9')
})

test('formatDate', () => {
    const sets = [
        {
            params: [-842704200, 'short'],
            result: '4/19/1943 1:30:00 PM'
        },
        {
            params: [-842704200, 'long'],
            result: 'Mon, April 19, 1943'
        },
        {
            params: [-842704200, 'time'],
            result: '1:30:00 PM'
        }
    ]

    sets.forEach(({ params, result }) => {
        const output = formatDate(...params)
        expect(output).toBe(result)
    })
})

test('getTimeUnits', () => {
    const time = 60 * 60 * 3 + 60 * 59 + 15

    const sets = [
        {
            params: [time, 'h'],
            result: '03'
        },
        {
            params: [time, 'm'],
            result: '59'
        },
        {
            params: [time, 's'],
            result: '15'
        }
    ]

    sets.forEach(({ params, result }) => {
        const output = getTimeUnits(...params)
        expect(output).toBe(result)
    })
})
