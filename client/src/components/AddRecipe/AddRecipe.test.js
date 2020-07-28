import React from 'react';
import AddRecipe from './AddRecipe'
import { mountSetup } from '../../test/helpers.js'
import { GET_USER } from '../../queries/getUser';

it('renders without error', () => {
    const component = mountSetup(AddRecipe)
    expect(component.length).toBeGreaterThan(0)
})

it('redirects to home if user not logged in', () => {
    const unauthorizedMock = {
        request: {
            query: GET_USER,
            variables: {
                token: 'token'
            }
        },
        result: {
            data: null
        }
    }
    const component = mountSetup(AddRecipe)
})

it('adds a new recipe on submit', () => {

})