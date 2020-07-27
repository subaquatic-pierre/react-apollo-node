import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
    query GetProfile(
        $token: String!
    ){
        getProfile(
            token: $token
        ){
            user{
                _id
                username
                email
                joinDate
                favourites {
                    _id
                }
            }
            favRecipes {
                _id
                likes
                category
                name
                username
            }
            createdRecipes {
                _id
                likes
                category
                name
            }
        }
    }
`