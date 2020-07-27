import { gql } from '@apollo/client';

export const ADD_LIKE = gql`
    mutation AddLike($id: ID!){
        addLike(id:$id){
            _id
            name
            category
            description
            instructions
            likes
        }
    }
`