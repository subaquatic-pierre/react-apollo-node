import React from 'react';
import Error from './Error';
import { shallowSetup } from '../../test/helpers.js'

it('renders without error', () => {
    const component = shallowSetup(Error)
    expect(component.length).toBeGreaterThan(0)
})

const props = {
    message: 'There was an error'
}

it('displays correct error message', () => {
    const component = shallowSetup(Error, props)
    expect(component.text()).toContain("There was an error")
})