import { gql } from '@apollo/client';

export const GET_ALL_RECIPES = gql`
    query { 
        getAllRecipes{
        _id
        name
        category
        description
        username
        likes
        instructions
        }
    }
`