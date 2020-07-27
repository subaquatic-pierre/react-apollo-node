import React from 'react';
import AddRecipe from './AddRecipe'
import { mountSetup } from '../../test/helpers.js'

it('renders without error', () => {
    const component = mountSetup(AddRecipe)
    expect(component.length).toBeGreaterThan(0)
})

it('redirects to home if user not logged in', () => {

})

it('adds a new recipe on submit', () => {

})