import React from 'react';

import Recipe from '../Recipe';
import { render, wait, fireEvent } from '../../../test/utils'
import { recipe1, user } from '../../../test/__mocks__'
import * as mockHelpers from '../../../updateCache/helpers'
import mockUpdateFavs from '../../../updateCache/updateUserFavs';
import mockGetUser from '../../../auth/getUser'

jest.mock('../../../updateCache/updateUserFavs')
jest.mock('../../../auth/getUser')
jest.mock('../../../updateCache/helpers')


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '1',
    }),
}));

afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
})

mockGetUser.mockReturnValue(user)

const customResolvers = {
    Query: () => ({
        getRecipe: () => ({
            ...recipe1
        })
    }),
    Mutation: () => ({
        addLike: () => ({
            ...recipe1,
            likes: 7,
        }),
        removeLike: () => ({
            ...recipe1,
            likes: 5,
        })
    })
}

describe('like button click integration test', () => {

    it('increments like count', async () => {
        const { findByLabelText } = render(<Recipe />, customResolvers)
        const likeButton = await findByLabelText(/like-button/i)
        const numberOfLikes = await findByLabelText(/recipe-likes/i)
        expect(numberOfLikes.textContent).toContain(6)

        fireEvent.click(likeButton)

        await wait(async () => {
            expect(mockHelpers.addRecipe).toHaveBeenCalledTimes(1)
            expect(mockUpdateFavs).toHaveBeenCalledTimes(1)
            expect(numberOfLikes.textContent).toContain(7)
        })

    })

    it('decrements like count', async () => {
        mockHelpers.checkRecipeLiked.mockReturnValue(true)
        const { findByLabelText } = render(<Recipe />, customResolvers)
        const likeButton = await findByLabelText(/like-button/i)
        const numberOfLikes = await findByLabelText(/recipe-likes/i)
        expect(numberOfLikes.textContent).toContain(6)

        fireEvent.click(likeButton)
        await wait(async () => {
            expect(mockHelpers.removeRecipe).toHaveBeenCalledTimes(1)
            expect(mockUpdateFavs).toHaveBeenCalledTimes(1)
            expect(numberOfLikes.textContent).toContain(5)
        })
    })
})