import React from 'react';
import Search from '../Search';
import user from '@testing-library/user-event'
import { render, wait } from '../../../test/utils'
import { recipe1, recipe2 } from '../../../test/__mocks__'

const customResolvers = {
    Query: () => ({
        recipeSearch: () => (
            [
                recipe1,
                recipe2
            ]
        )
    })
}

it('renders error if error', async () => {
    const errorResolver = {
        Query: () => ({
            recipeSearch: () => {
                throw new Error('There was an error')
            }
        })
    }
    const { getByRole } = render(<Search />, errorResolver)

    const input = getByRole(('searchbox'))
    user.type(input, 'some')
    await wait(() => {
        getByRole('error')
    })
})

it('renders two recipes searched for', async () => {
    const { getByRole, getByText, debug } = render(<Search />, customResolvers)

    const input = getByRole(('searchbox'))
    user.type(input, 'some')
    await wait(() => {
        getByText(recipe1.name)
        getByText(recipe2.name)
    })
})