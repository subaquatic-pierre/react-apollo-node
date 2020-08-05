import React from 'react';
import Error from '../Error';
import { render } from '../../../tests/utils.js'

const props = {
    message: 'There was an error'
}

it('displays correct error message', () => {
    const { getByRole } = render(<Error {...props} />)
    expect(getByRole('error').textContent).toContain("There was an error")
})