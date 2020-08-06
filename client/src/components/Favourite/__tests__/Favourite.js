import React from 'react';
import { render, fireEvent, wait } from '../../../test/utils.js'
import Favourite from '../Favourite';
import { user, recipe1 } from '../../../test/__mocks__'
import mockUpdateFavs from '../../../updateCache/updateUserFavs';
import { removeRecipe as mockRemoveRecipe } from '../../../updateCache/helpers';

jest.mock('../../../updateCache/updateUserFavs')
jest.mock('../../../updateCache/helpers')

afterEach(() =>
    jest.clearAllMocks()
)

it('renders without error', () => {
    const { getByLabelText, getByText } = render(<Favourite user={user} recipe={recipe1} />)
    getByLabelText(/unlike-button/i)
    getByText(recipe1.name)
    expect(getByText(/Likes:/).textContent).toContain(recipe1.likes)
    getByText(recipe1.category)
})

it('handles unlike click', async () => {
    const { getByLabelText } = render(<Favourite user={user} recipe={recipe1} />)
    const unlikeButton = getByLabelText(/unlike-button/i)
    fireEvent.click(unlikeButton)

    await wait(() => {
        expect(mockRemoveRecipe).toHaveBeenCalledTimes(1)
        expect(mockUpdateFavs).toHaveBeenCalledTimes(1)
    })
})
