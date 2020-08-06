import React from 'react';
import { render, wait, fireEvent } from '../../../test/utils.js'
import Profile from '../Profile';
import { user, recipe1, recipe2, recipe3 } from '../../../test/__mocks__'

const customResolvers = {
    Query: () => ({
        getProfile: () => ({
            user,
            favRecipes: [],
            createdRecipes: []
        })
    })
}

beforeEach(() => {
    localStorage.setItem('token', 'token')
})

it('shows all user info', async () => {
    const { getByText, getByRole } = render(<Profile />, customResolvers)
    getByRole('loading')
    await wait(() => {
        getByText(user.username)
        getByText(user.email)
    })
})

it('shows `No Favourites` and `No Created Recipes`', async () => {
    const { getByText } = render(<Profile />, customResolvers)
    await wait(() => {
        getByText(/no favourites/i)
        getByText(/no created recipes/i)
    })
})

const customResolversFavsCreated = {
    Query: () => ({
        getProfile: () => ({
            user,
            favRecipes: [recipe1, recipe2],
            createdRecipes: [recipe1, recipe2, recipe3]
        })
    })
}

it('shows correct number of created recipes', async () => {
    const { getAllByTestId } = render(<Profile />, customResolversFavsCreated)
    await wait(() => {
        const allCreated = getAllByTestId('user-recipe')
        expect(allCreated.length).toBe(3)
    })
})

it('shows correct number of favourite recipes', async () => {
    let userFavourites;
    const { getAllByTestId } = render(<Profile />, customResolversFavsCreated)
    await wait(async () => {
        userFavourites = getAllByTestId('user-favourites')
        expect(userFavourites.length).toBe(2)
    })
})

it('renders error on error', async () => {
    const errorResolver = {
        Query: () => ({
            getProfile: () => {
                throw new Error('Oh No')
            }
        })
    }
    const { getByRole } = render(<Profile />, errorResolver)
    await wait(() => {
        getByRole('error')
    })
})
