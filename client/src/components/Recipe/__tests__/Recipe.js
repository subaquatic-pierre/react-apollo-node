import React from 'react';

import Recipe from '../Recipe';
import { render, wait, fireEvent } from '../../../test/utils'
import { recipe1, user } from '../../../test/__mocks__'
import mockGetUser from '../../../auth/getUser'

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

describe('basic rendering', () => {

    it('renders without error', async () => {
        const { findByText } = render(<Recipe />, customResolvers)
        await findByText(recipe1.name)
    })

    it('shows like button if user is logged in', async () => {
        const { findByRole } = render(<Recipe />)
        mockGetUser.mockReturnValueOnce(user)
        await findByRole('button', { name: 'like-button' })
    })

    it('does not show like button if user is not logged in', async () => {
        const { queryByLabelText } = render(<Recipe />)
        mockGetUser.mockReturnValueOnce(null)
        await wait(() => {
            expect(queryByLabelText(/like-button/i)).not.toBeInTheDocument()
        })
    })


    it('renders spinner if loading', async () => {
        const { findByRole } = render(<Recipe />)
        await findByRole('loading')
        await wait(() => {
        })
    })

    it('renders error if error', async () => {
        const errorResolver = {
            Query: () => ({
                getRecipe: () => {
                    throw new Error('Recipe not found')
                }
            })
        }
        const { findByRole } = render(<Recipe />, errorResolver)
        await findByRole('error')
    })

    it('shows `Like` on button if NOT already liked, increases like count if `Like` button clicked', async () => {
        const { findByLabelText } = render(<Recipe />, customResolvers)
        user.favourites = [{ _id: '3', }, { _id: '2', }]
        mockGetUser.mockReturnValue(user)
        const likeButton = await findByLabelText(/like-button/i)
        const numberOfLikes = await findByLabelText(/recipe-likes/i)

        expect(numberOfLikes.textContent).toContain('6')
        expect(likeButton.textContent).toBe('Like')

        fireEvent.click(likeButton)
        await wait(() => {
            expect(numberOfLikes.textContent).toContain('7')
        })
    })

    it('shows `Liked` on button if already liked, reduces like count if `Liked button clicked', async () => {
        const { findByLabelText } = render(<Recipe />, customResolvers)
        user.favourites = [{ _id: '1', }, { _id: '2', }]
        mockGetUser.mockReturnValue(user)

        const likeButton = await findByLabelText(/like-button/i)
        const numberOfLikes = await findByLabelText(/recipe-likes/i)

        expect(numberOfLikes.textContent).toContain('6')
        expect(likeButton.textContent).toBe('Liked')

        fireEvent.click(likeButton)
        await wait(() => {
            expect(numberOfLikes.textContent).toContain('5')
        })
    })
})
