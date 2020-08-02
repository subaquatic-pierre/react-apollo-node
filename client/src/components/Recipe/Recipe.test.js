import React from 'react';
import Recipe from './Recipe';
import { render, fireEvent, waitForDomChange, wait } from '../../test/testUtils'

import { GET_RECIPE } from '../../queries/getRecipe'

const mocks = [
    {
        request: {
            query: GET_RECIPE,
            variables: { id: 'id' }
        },
        result: {
            data: {
                getRecipe: {
                    _id: 'some',
                    name: 'some',
                    category: 'some',
                    description: 'some',
                    instructions: 'some',
                    likes: 'some'
                }
            }
        }
    },
]

it('renders without error', async () => {
    const { debug, container } = render(<Recipe />, mocks)
    debugger
    // await waitForDomChange()
    debug()
})

// it('renders spinner if loading', () => {

// })

// it('renders error if error', () => {

// })

// it('shows like button if user is logged in', () => {

// })

// it('increments like count', () => {

// })

// it('does not increment like count if already liked', () => {

// })

// it('decrements like count', () => {

// })

// it('does not decrement like count if already unliked', () => {

// })

// it('shows `Like` on button if NOT already liked', () => {

// })

// it('shows `Liked` on button if already liked', () => {

// })