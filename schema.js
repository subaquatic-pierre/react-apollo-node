import apollo from 'apollo-server'
const { gql } = apollo;

export const typeDefs = gql`
    type Recipe {
        _id: ID
        name: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        username: String! 
        password: String!
        email: String!
        joinDate: String!
        favourites: [Recipe]
    }

    type Query {
        getAllRecipes: [Recipe]
    }

    type Mutation {
        addRecipe(
            name: String!
            category: String!
            description: String!
            instructions: String!
        ) : Recipe
    }
`