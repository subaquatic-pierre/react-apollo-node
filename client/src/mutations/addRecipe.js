import { gql } from '@apollo/client';

export const ADD_RECIPE = gql`
mutation AddRecipe(
    $name: String!
    $category: String!
    $description: String!
    $instructions: String!
    ) {
        addRecipe(
          name:$name,
          category: $category,
          description: $description,
          instructions: $instructions
          ) {
            _id
            name
            category
            description
            username
          }
      }
`