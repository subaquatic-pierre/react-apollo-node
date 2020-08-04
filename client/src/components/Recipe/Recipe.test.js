import React from 'react';
import { InMemoryCache } from '@apollo/client'

import { GET_USER } from '../../queries/getUser';
import Recipe from './Recipe';
import { render, wait } from '../../test/testUtils'
import { authMocks, unAuthMocks } from './Recipe.mocks'

const cache = new InMemoryCache()
cache.writeQuery({
    query: GET_USER,
    data: {
        getUser: {
            username: 'user',
            email: 'email',
            favourites: []
        }
    }
})

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '5f182d9915110f6488b8a32f',
    }),
    useRouteMatch: () => ({ url: '/company/company-id1/team/team-id1' }),
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
    const { getByLabelText } = render(<Recipe />, authMocks, cache)
    await wait(() => {
        const likeButton = getByLabelText(/like-button/i)
        console.log(likeButton.innerHTML)
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