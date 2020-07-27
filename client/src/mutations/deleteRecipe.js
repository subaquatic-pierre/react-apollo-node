import { gql } from '@apollo/client';

export const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: ID!){
        deleteRecipe(id:$id) {
            _id
            name
        }
    }
`