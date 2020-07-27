import { gql } from '@apollo/client'

export const RECIPE_SEARCH = gql`
    query RecipeSearch($searchTerm:String){
        recipeSearch(searchTerm:$searchTerm){
            _id
            name
            likes
        }
    }
`