import { gql } from '@apollo/client';

export const GET_RECIPE = gql`
    query GetRecipe($id:ID!){
        getRecipe(id:$id){
            _id
            name
            category
            description
            instructions
            likes
        }
    }
`