import React from 'react';

import Recipe from '../Recipe';
import { render, wait, fireEvent } from '../../../test/utils'

import { recipe1, user } from '../../../test/__mocks__'

// Mocks
import mockUpdateFavs from '../../../updateCache/updateUserFavs'
import * as mockHelpers from '../../../updateCache/helpers'
import mockGetUser from '../../../auth/getUser'

jest.mock('../../../updateCache/helpers')
jest.mock('../../../updateCache/updateUserFavs')
jest.mock('../../../auth/getUser')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '1',
    }),
}));

afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    mockGetUser.mockRestore()
})

const customResolvers = {
    Query: () => ({
        getRecipe: () => ({
            ...recipe1
        })
    })
}

it('increments like count', async () => {
    mockGetUser.mockReturnValue(user)

    const { findByLabelText } = render(<Recipe />, customResolvers)
    const likeButton = await findByLabelText(/like-button/i)
    fireEvent.click(likeButton)

    await wait(async () => {
        const numberOfLikes = await findByLabelText(/recipe-likes/i)
        // expect(numberOfLikes.textContent).toContain('11')
    })
})

// it('does not increment like count if already liked', async () => {
//     const { getByLabelText } = render(<Recipe />, recipeMocks)
//     mockGetUser.mockReturnValueOnce({ username: 'user', email: 'email', favourites: [] })
//     await wait(() => {
//         const numberOfLikes = getByLabelText(/recipe-likes/i)
//         expect(numberOfLikes.textContent).toContain('10')
//         const likeButton = getByLabelText(/like-button/i)
//         fireEvent.click(likeButton)
//         expect(numberOfLikes.textContent).toContain('11')
//     })
// })

// it('decrements like count', () => {

// })

// it('does not decrement like count if already unliked', () => {

// })