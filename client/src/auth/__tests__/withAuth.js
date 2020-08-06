import React from 'react';
import withAuth from '../withAuth'
import Profile from '../../components/Profile'
import { render, wait } from '../../test/utils';
import { user, recipe1, recipe2, recipe3 } from '../../test/__mocks__'


const WithHOC = withAuth(Profile)

const customResolvers = {
    Query: () => ({
        getUser: () => ({
            ...user
        }),
        getProfile: () => ({
            user,
            favRecipes: [],
            createdRecipes: []
        })
    })
}

it('redirect when user not logged in', async () => {
    localStorage.setItem('token', 'token')
    const { getByText, getByRole, debug } = render(<WithHOC />, customResolvers)
    getByRole('loading')
    await wait(() => {
        getByText(user.username)
    })
})

it('renders error', async () => {
    const errorResolvers = {
        Query: () => ({
            getUser: () => { throw new Error('Big error! ') }
        })
    }
    const { getByRole } = render(<WithHOC />, errorResolvers)

    await wait(() => {
        getByRole('error')
    })
})

it('redirects on no auth', async () => {
    const noAuthResolvers = {
        Query: () => ({
            getUser: () => null
        })
    }
    const { queryByText, debug } = render(<WithHOC />, noAuthResolvers)
    await wait(() => {
        expect(queryByText(user.username)).toBe(null)
    })
})