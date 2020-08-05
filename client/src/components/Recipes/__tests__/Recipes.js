import React from 'react';
import Recipes from '../Recipes';
import { render } from '../../../tests/utils'
import { GET_ALL_RECIPES } from '../../../queries/allRecipes';

const mocks = [
    {
        request: {
            query: GET_ALL_RECIPES,
        },
        result: {
            data: {
                getAllRecipes: [
                    {
                        _id: 'this',
                        name: 'first',
                        category: 'first',
                        description: 'first',
                        username: 'first',
                        likes: 'first',
                        instructions: ''
                    },
                    {
                        _id: '',
                        name: 'second',
                        category: 'second',
                        description: 'second',
                        username: 'second',
                        likes: 'second',
                        instructions: 'second'
                    },
                ]
            }
        }
    },
]

it('renders without error', async () => {
    const { debug } = render(<Recipes />, mocks)
    // debug()
})

// it('renders spinner if loading', () => {

// })

// it('renders error if error', () => {

// })

// it('renders single recipe when recipe clicked on', () => {

// })