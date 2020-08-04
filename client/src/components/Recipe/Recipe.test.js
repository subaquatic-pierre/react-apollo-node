import React from 'react';
import { InMemoryCache } from '@apollo/client'

import { GET_USER } from '../../queries/getUser';
import Recipe from './Recipe';
import { render, wait } from '../../test/testUtils'
import { authMocks, unAuthMocks } from './Recipe.mocks'
import getUser from '../../auth/getUser'

jest.mock('../../auth/getUser')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '5f182d9915110f6488b8a32f',
    }),
}));

it('renders without error', async () => {
    const { getByLabelText } = render(<Recipe />, authMocks)
    await wait(() => {
        const headerNode = getByLabelText(/recipe-header/i)
        expect(headerNode.innerHTML).toBe('Awesome Recipe')
        const numberOfLikes = getByLabelText(/recipe-likes/i)
        expect(numberOfLikes.innerHTML).toContain('10')
    })
})

it('shows like button if user is logged in', async () => {
    const { getByLabelText } = render(<Recipe />, authMocks)
    getUser.mockReturnValueOnce({ username: 'user', email: 'email', favourites: [] })
    await wait(() => {
        getByLabelText(/like-button/i)
    })
})


// it('renders spinner if loading', () => {

// })

// it('renders error if error', () => {

// })


// it('increments like count', () => {

// })

// it('does not increment like count if already liked', () => {

// })

// it('decrements like count', () => {

// })

// it('does not decrement like count if already unliked', () => {

// })

// it('shows `Like` on button if NOT already liked', () => {

// })

// it('shows `Liked` on button if already liked', () => {

// })