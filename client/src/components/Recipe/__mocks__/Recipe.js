import { GET_RECIPE } from '../../../queries/getRecipe'
import { REMOVE_LIKE } from '../../../mutations/removeLike'
import { ADD_LIKE } from '../../../mutations/addLike'
import { mockGetUserQuerySuccess } from '../../../auth/__mocks__'

const mockRecipeQuery = {
    request: {
        query: GET_RECIPE,
        variables: { id: '1' }
    },
    result: {
        data: {
            getRecipe: {
                _id: '1',
                name: 'Awesome Recipe',
                category: 'some',
                description: 'some',
                instructions: 'some',
                likes: 10
            }
        }
    }
}

const mockAddLikeQuery = {
    request: {
        query: ADD_LIKE,
        variables: { id: '1' }
    },
    result: {
        data: {
            getRecipe: {
                _id: '1',
                name: 'Awesome Recipe',
                category: 'some',
                description: 'some',
                instructions: 'some',
                likes: 11
            }
        }
    }
}
const mockRemoveLikeQuery = {
    request: {
        query: REMOVE_LIKE,
        variables: { id: '1' }
    },
    result: {
        data: {
            getRecipe: {
                _id: '1',
                name: 'Awesome Recipe',
                category: 'some',
                description: 'some',
                instructions: 'some',
                likes: 10
            }
        }
    }
}

export const recipeMocks = [
    mockRecipeQuery,
    mockAddLikeQuery,
    mockRemoveLikeQuery,
    mockGetUserQuerySuccess
]

export const errorMocks = [
    {
        request: {
            query: GET_RECIPE,
            variables: { id: '1' }
        },
        error: new Error('There was an error')
    },
]