import { gql } from '@apollo/client';

export const REMOVE_LIKE = gql`
    mutation RemoveLike($id: ID!){
        removeLike(id:$id){
            _id
            name
            category
            description
            instructions
            likes
        }
    }

`