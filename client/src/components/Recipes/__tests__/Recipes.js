import React from 'react';
import Recipes from '../Recipes';
import { render, waitForDomChange, fireEvent, wait } from '../../../test/utils'
import { recipe1, recipe2 } from '../../../test/__mocks__'

const resolvers = {
    Query: () => ({
        getAllRecipes: () => {
            return [
                recipe1,
                recipe2
            ]
        }
    })
}

it('renders without error', async () => {
    render(<Recipes />, resolvers)
    await waitForDomChange()
})

it('renders spinner if loading', async () => {
    const { getByRole } = render(<Recipes />, resolvers)
    getByRole('loading')
    await waitForDomChange()
})

it('renders error if error', async () => {
    const resolvers = {
        Query: () => ({
            getAllRecipes: () => {
                throw new Error('There was an error')
            }
        })
    }
    const { findByRole } = render(<Recipes />, resolvers)
    await findByRole('error')
})

it('renders single recipe when recipe clicked on', async () => {
    const { debug, findByText, getByText, getByRole, findByRole, container } = render(<Recipes />, resolvers)
    const link = await findByRole('link', { name: recipe1.name })
    const heading = getByText(recipe1.name)
    console.log(heading)
    console.log(link)
    fireEvent.click(link)
    fireEvent.click(heading)
    debug()
})