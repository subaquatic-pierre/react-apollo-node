import React from 'react';
import Search from './Search';
import { mountSetup, shallowSetup } from '../../test/helpers'

import { RECIPE_SEARCH } from '../../queries/recipeSearch'
import { act } from 'react-dom/test-utils';

it('renders without error', () => {
    const wrapper = shallowSetup(Search)
    expect(wrapper.length).toBeGreaterThan(0)
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

it('renders spinner if loading', async () => {
    const wrapper = mountSetup(Search, mocks)

    await act(async () => {
        const input = wrapper.find('input')
        await input.simulate('change', { event: { target: { value: 'recipe' } } })
    })
    console.log(wrapper.debug())
})

it('renders error if error', () => {

})

it('searchs on input change', () => {

})

it('searches on input blur', () => {

})