import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'

import Button from '../../src-ui/components/Button'

test('Button shows proper label', () => {
    const { getByText } = render(Button, { props: { label: 'Foo Bar', onClick: () => {} } })
    expect(getByText('Foo Bar')).toBeInTheDocument()
})
