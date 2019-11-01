import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render } from '@testing-library/svelte'

import Button from '../../src-ui/components/Button'

test('Button shows proper label', () => {
    const { getByText } = render(Button, { props: { label: 'Foo Bar', onClick: () => {} } })
    expect(getByText('Foo Bar')).toBeInTheDocument()
})

test('Button shows proper loading label', () => {
    const { getByText } = render(Button, {
        props: { label: 'Foo Bar', loadingLabel: 'Baz Qux', loading: true, onClick: () => {} }
    })
    expect(getByText('Baz Qux')).toBeInTheDocument()
})

test('Button click triggers callback', async () => {
    const callback = jest.fn(() => {})
    const { getByText } = render(Button, { props: { label: 'Foo Bar', onClick: callback } })

    const button = getByText('Foo Bar')
    await fireEvent.click(button)

    expect(callback.mock.calls.length).toBe(1)
})

test('Button adds correct class names', async () => {
    const classes = ['secondary', 'warning', 'small', 'double', 'disabled', 'list']

    classes.forEach((className) => {
        const props = { label: 'Foo Bar', onClick: () => {} }
        props[className] = true

        const { getByText } = render(Button, { props })
        const button = getByText('Foo Bar')

        expect(button.classList).toContain(className)

        cleanup()
    })
})
