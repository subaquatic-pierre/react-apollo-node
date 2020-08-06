import React from 'react';
import { render, fireEvent } from '../../../test/utils.js'
import Navbar from '../Navbar';
import { siteTitle } from '../../../utils/siteConfig'
import mockGetUser from '../../../auth/getUser';
import { user } from '../../../test/__mocks__';
import wait from 'waait';

jest.mock('../../../auth/getUser')

afterEach(() => {
    jest.clearAllMocks()
    mockGetUser.mockRestore()
})

const customResolvers = {
    Query: () => ({
        getUser: () => ({
            ...user
        })
    })
}

it('renders without error', () => {
    const { getByRole } = render(<Navbar />)
    expect(getByRole('banner').textContent).toContain(siteTitle)
})

it('displays auth nav on user logged in', () => {
    mockGetUser.mockReturnValue(user)
    const { getByText } = render(<Navbar />)
    getByText(/logout/i)
})

it('displays normal nav when no user logged in', () => {
    mockGetUser.mockReturnValue(false)
    const { getByText } = render(<Navbar />)
    getByText(/login/i)
})

it('removes token on user log out and redirects to home', async () => {
    mockGetUser.mockReturnValue(user)
    const { getByName } = render(<Navbar />)
    localStorage.setItem('token', 'awesome')

    const logoutButton = getByName('logout-button')
    const origLocation = window.location
    window.location.replace = jest.fn()
    fireEvent.click(logoutButton)
    const token = localStorage.getItem('token')

    expect(token).toBe(null)
    expect(window.location.replace).toHaveBeenCalledWith('/')

    window.location.replace = origLocation
    await wait(() => {
    })
})

const getCurrentPathName = () => window.location.pathname

it('routes to correct url on menu item clicks on auth', () => {
    mockGetUser.mockReturnValue(user)
    const { getByText } = render(<Navbar />)

    fireEvent.click(getByText(/search/i))
    expect(getCurrentPathName()).toBe('/search')

    fireEvent.click(getByText(/add recipe/i))
    expect(getCurrentPathName()).toBe('/add-recipe')

    fireEvent.click(getByText(/search/i))
    expect(getCurrentPathName()).toBe('/search')
})

it('routes to correct url on menu item clicks not authenticated', () => {
    mockGetUser.mockReturnValue(false)
    const { getByText } = render(<Navbar />)

    fireEvent.click(getByText(/signup/i))
    expect(getCurrentPathName()).toBe('/signup')

    fireEvent.click(getByText(/login/i))
    expect(getCurrentPathName()).toBe('/login')
})