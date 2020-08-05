import { ADD_RECIPE } from '../../../mutations/addRecipe'
import { mockGetUserQuerySuccess, getProfileQuerySuccess } from '../../../auth/__mocks__'
import { GET_ALL_RECIPES } from '../../../queries/allRecipes'


export const recipeVars =
{
    name: 'Awesome Recipe',
    category: 'Breakfast',
    description: 'This is the best description of a recipe a human can make, maybe!',
    username: 'user'
}

const getAllRecipes = {
    request: {
        query: GET_ALL_RECIPES
    },
    result: {
        data: {
            getAllRecipes: []
        }
    }
}

export const addRecipeMocks = [
    getAllRecipes,
    getProfileQuerySuccess,
    {
        request: {
            query: ADD_RECIPE,
            variables: {
                name: '',
                category: '',
                category: '',
                instructions: ''
            }
        },
        result: {
            data: {
                addRecipe: {
                    _id: '',
                    name: '',
                    category: '',
                    description: '',
                    username: ''
                }
            }
        }
    },
    {
        request: {
            query: ADD_RECIPE,
            variables: {
                name: '',
                category: '',
                category: '',
                instructions: ''
            }
        },
        result: {
            data: {
                addRecipe: {
                    _id: '',
                    name: '',
                    category: '',
                    description: '',
                    username: ''
                }
            }
        }
    },
]

