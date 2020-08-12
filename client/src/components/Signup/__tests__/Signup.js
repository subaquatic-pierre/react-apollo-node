import React from 'react';
import { render, wait } from '../../../test/utils.js'
import user from '@testing-library/user-event'
import Signup from '../Signup';


const customResolvers = {
    Mutation: () => ({
        signupUser: () => ({
            token: 'token'
        })
    })
}

window.location.assign = jest.fn()

it('submits mutation with correct data on button click, and redirects to login', async () => {
    const { getByName } = render(<Signup />, customResolvers)
    const nameInput = getByName('username')
    const passwordInput = getByName('password')
    const confirmPasswordInput = getByName('confirmPassword')
    const emailInput = getByName('email')
    const submitButton = getByName('submitButton')
    user.type(nameInput, 'user')
    user.type(passwordInput, 'password')
    user.type(confirmPasswordInput, 'confirmpassword')
    user.type(emailInput, 'email@email.com')
    user.click(submitButton)

    await wait(() => {
        expect(window.location.assign).toHaveBeenCalledWith('/login')
    })
})

const errorResolver = {
    Mutation: () => ({
        signupUser: () => {
            throw new Error('There was a problem signing up the user')
        }
    })
}

it('renders error', async () => {
    const { getByName, getByRole, debug } = render(<Signup />, errorResolver)
    const submitButton = getByName('submitButton')
    user.click(submitButton)

    await wait(() => {
        getByRole('error')
    })
})