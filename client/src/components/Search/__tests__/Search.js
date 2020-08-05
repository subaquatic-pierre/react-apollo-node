import React from 'react';
import Search from '../Search';
import { RECIPE_SEARCH } from '../../../queries/recipeSearch'
import { render, fireEvent } from '../../../tests/utils'

it('renders without error', () => {
    const wrapper = render(<Search />)
})

const mocks = [
    {
        request: {
            query: RECIPE_SEARCH,
            variables: { searchTerm: 'recipe' },
        },
        result: {
            data: {
                recipeSearch: [
                    {
                        name: 'Recipe',
                        likes: 4
                    },
                ]
            }
        }
    }
]

it('renders spinner if loading', () => {


    const { container, getByPlaceholderText, debug } = render(<Search />, mocks)
    const inputNode = getByPlaceholderText('Enter search term')

    // fireEvent.change(inputNode, { target: { value: 'r' } })
})

it('renders error if error', () => {

})

it('searchs on input change', () => {

})

it('searches on input blur', () => {

})