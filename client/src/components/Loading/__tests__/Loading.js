import React from 'react';
import Loading from '../Loading';
import { render } from '../../../test/utils.js'

it('renders without error', () => {
    const { getByRole } = render(<Loading />)
    getByRole('loading')
})