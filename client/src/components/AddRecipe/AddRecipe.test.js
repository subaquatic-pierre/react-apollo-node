import React from 'react';
import AddRecipe from './AddRecipe'
import { mountSetup } from '../../test/helpers.js'
import { GET_USER } from '../../queries/getUser';

it('renders without error', () => {
    const component = mountSetup(AddRecipe)
    expect(component.length).toBeGreaterThan(0)
})

it('adds a new recipe on submit', () => {

})