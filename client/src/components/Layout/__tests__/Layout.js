import React from 'react';
import { render, wait } from '../../../test/utils.js'
import Layout from '../Layout'
import { user } from '../../../test/__mocks__'
import { siteTitle } from '../../../utils/siteConfig'

const MockChildren = (<div />)

const customResolvers = {
    Query: () => ({
        getUser: () => ({
            ...user
        })
    })
}

it('renders without error', async () => {
    const { getByRole } = render(<Layout children={MockChildren} />, customResolvers)
    expect(getByRole('banner').textContent).toContain(siteTitle)

    await wait(() => {
    })
})

it('renders error if error', async () => {
    const errorResolvers = {
        Query: () => ({
            getUser: () => { throw new Error('Oh no') }
        })
    }

    const { getByRole } = render(<Layout children={MockChildren} />, errorResolvers)

    await wait(() => {
        getByRole('error')
    })
})

it('renders loading if laoding', async () => {
    const { getByRole } = render(<Layout children={MockChildren} />, customResolvers)
    getByRole('loading')

    await wait(() => {
    })
})
