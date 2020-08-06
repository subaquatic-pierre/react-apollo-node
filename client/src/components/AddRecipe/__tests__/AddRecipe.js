import React from 'react';
import AddRecipe from '../AddRecipe'
import { render, fireEvent, wait } from '../../../test/utils.js'

import { validateRecipeForm as mockValidateRecipeForm } from '../../../utils/formUtils'
import mockGetProfile from '../../../auth/getProfile'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
}))

jest.mock('../../../auth/getProfile')
jest.mock('../../../utils/formUtils')

mockGetProfile.mockReturnValue(true)
mockValidateRecipeForm.mockReturnValue(true)

afterEach(() => {
    jest.clearAllMocks()
})

test('renders correctly', () => {
    const { debug } = render(<AddRecipe />)
})

test('try', () => {
    const { container, getByRole } = render(<AddRecipe />)
    const submitButton = container.querySelector("button[type='submit']")
    // fireEvent.click(submitButton)
})

// it('adds a new recipe on submit', async () => {
    // const { container, debug, getByLabelText } = render(<AddRecipe />, addRecipeMocks)
    // get form elements, 
    // TODO: Create functions to get all form inputs
    // const elementNames = ['name', 'description', 'category', 'instructions']
    // const elementList = getElementsByName(elementNames)
    // const nameInput = container.querySelector("input[name='name']")
    // const descriptionInput = container.querySelector("textarea[name='description']")
    // const categorySelect = container.querySelector("input[name='category']")
    // const instructionsInput = container.querySelector("textarea[name='instructions']")

    // simulate change events on a elements
    // TODO: Function to simulate change on all inputs
    // fireEvent.change(nameInput, { target: { name: 'name', value: recipeVars.name } })
    // fireEvent.change(descriptionInput, { target: { name: 'description', value: recipeVars.description } })
    // fireEvent.change(categorySelect, { target: { name: 'category', value: 'Breakfast' } })
    // fireEvent.change(instructionsInput, { target: { name: 'instructions', value: 'These are the greatest instructions' } })


    // simulate button click
    // const submitButton = getByLabelText('submit-button')
    // console.log(submitButton)
    // fireEvent.click(submitButton)
    // await wait(() => {
    //     console.log(mockGetProfile.mock.calls)
    //     console.log(MockRedirect.mock.calls)
    // })
// })

// it('redirects on add recipe button click if the user is not authenticated', () => {
//     const { getByText, getByLabelText } = render(<AddRecipe />, addRecipeMocks)
//     mockGetProfile.mockReturnValue(true)

// })