import apollo from 'apollo-server'
const { gql } = apollo;

export const typeDefs = gql`
    type Recipe {
        _id: ID!
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

    type Token {
        token: String!
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(id:ID!): Recipe
        getUser(token: String!): User
        recipeSearch(searchTerm:String): [Recipe]
    }

    type Mutation {
        addRecipe(
            name: String!
            category: String!
            description: String!
            instructions: String!
        ) : Recipe

        resetLikes : [Recipe]

        addLike(
            id: ID!
        ) : Recipe
        
        removeLike(
            id: ID!
        ) : Recipe

        signupUser(
            username: String!
            email: String!
            password: String!
        ) : Token
        
        loginUser(
            username: String!
            password: String!
        ) : Token
        
    }
`