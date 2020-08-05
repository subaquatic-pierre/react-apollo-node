import React from 'react';

import Recipe from '../Recipe';
import { render, wait, fireEvent } from '../../../tests/utils'
import { recipeMocks, errorMocks } from '../__mocks__/Recipe'
import getUser from '../../../auth/getUser'
import getProfile from '../../../auth/getProfile'

jest.mock('../../../auth/getUser')
jest.mock('../../../auth/getProfile')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '1',
    }),
}));

afterEach(() => {
    jest.clearAllMocks()
    getUser.mockRestore()
})

it('renders without error', async () => {
    const { getByLabelText } = render(<Recipe />, recipeMocks)
    await wait(() => {
        const headerNode = getByLabelText(/recipe-header/i)
        expect(headerNode.innerHTML).toBe('Awesome Recipe')
        const numberOfLikes = getByLabelText(/recipe-likes/i)
        expect(numberOfLikes.textContent).toContain('10')
    })
})

it('shows like button if user is logged in', async () => {
    const { getByLabelText } = render(<Recipe />, recipeMocks)
    getUser.mockReturnValueOnce({ username: 'user', email: 'email', favourites: [] })
    await wait(() => {
        getByLabelText(/like-button/i)
    })
})

it('does not show like button if user is not logged in', async () => {
    const { queryByLabelText } = render(<Recipe />, recipeMocks)
    await wait(() => {
        expect(queryByLabelText(/like-button/i)).toBe(null)
    })
})


it('renders spinner if loading', async () => {
    const { getByRole, getByText } = render(<Recipe />, recipeMocks)
    getByRole('loading')
    await wait(() => {
        getByText('Awesome Recipe')
    })
})

it('renders error if error', async () => {
    const { getByRole } = render(<Recipe />, errorMocks)
    await wait(() => {
        getByRole('error')
    })
})

const mockProfile = {
    user: {
        username: 'user',
        email: 'email',
        favourites: []
    },
    favRecipes: [
        {
            _id: '1',
            likes: 10,
            category: 'cat',
            name: 'name',
            username: 'user'
        },
        {
            _id: '2',
            likes: 7,
            category: 'cat',
            name: 'nextname',
            username: 'user'
        }
    ]
}

// it('increments like count', async () => {
//     const { getByLabelText } = render(<Recipe />, recipeMocks)
//     getUser.mockReturnValue({ username: 'user', email: 'email', favourites: [] })
//     getProfile.mockReturnValueOnce(mockProfile)
//     await wait(() => {
//         const likeButton = getByLabelText(/like-button/i)
//         fireEvent.click(likeButton)
//         const numberOfLikes = getByLabelText(/recipe-likes/i)
//         expect(numberOfLikes.textContent).toContain('11')
//     })
// })

// it('does not increment like count if already liked', async () => {
//     const { getByLabelText } = render(<Recipe />, recipeMocks)
//     getUser.mockReturnValueOnce({ username: 'user', email: 'email', favourites: [] })
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

it('shows `Like` on button if NOT already liked', async () => {
    const { getByLabelText } = render(<Recipe />, recipeMocks)
    getUser.mockReturnValue({
        username: 'user', email: 'email', favourites: [{
            _id: '3',
        }, {
            _id: '2',
        },]
    })
    await wait(() => {
        const button = getByLabelText(/like-button/i)
        expect(button.textContent).toBe('Like')
    })
})

it('shows `Liked` on button if already liked', async () => {
    const { getByLabelText } = render(<Recipe />, recipeMocks)
    getUser.mockReturnValue({
        username: 'user', email: 'email', favourites: [{
            _id: '1',
        }, {
            _id: '2',
        },]
    })
    await wait(() => {
        const button = getByLabelText(/like-button/i)
        expect(button.textContent).toBe('Liked')
    })

})