import React from 'react';
import Recipes from '../Recipes';
import { render, waitForDomChange, fireEvent, screen } from '../../../test/utils'
import { recipe1 } from '../../../test/__mocks__'

const resolvers = {
    Query: () => ({
        getAllRecipes: () => {
            return [
                recipe1
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
    const { getByRole } = render(<Recipes />, resolvers)
    await waitForDomChange()
    getByRole('error')
})

it('renders single recipe when recipe clicked on', async () => {
    const { getByName, getByText, getByAttr } = render(<Recipes />, resolvers)
    await waitForDomChange()
})