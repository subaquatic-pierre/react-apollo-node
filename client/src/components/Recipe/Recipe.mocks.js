import { authUserMock, unAuthUserMock } from '../../test/testUtils'

import { GET_RECIPE } from '../../queries/getRecipe'

export const unAuthMocks = [
    {
        request: {
            query: GET_RECIPE,
            variables: { id: '5f182d9915110f6488b8a32f' }
        },
        result: {
            data: {
                getRecipe: {
                    _id: '5f182d9915110f6488b8a32f',
                    name: 'Awesome Recipe',
                    category: 'some',
                    description: 'some',
                    instructions: 'some',
                    likes: 10
                }
            }
        }
    },
    unAuthUserMock
]

export const authMocks = [
    {
        request: {
            query: GET_RECIPE,
            variables: { id: '5f182d9915110f6488b8a32f' }
        },
        result: {
            data: {
                getRecipe: {
                    _id: '5f182d9915110f6488b8a32f',
                    name: 'Awesome Recipe',
                    category: 'some',
                    description: 'some',
                    instructions: 'some',
                    likes: 10
                }
            }
        }
    },
    authUserMock
]