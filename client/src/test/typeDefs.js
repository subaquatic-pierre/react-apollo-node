export const typeDefs = `
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

    scalar Date

    type User {
        _id: ID
        username: String! 
        password: String!
        email: String!
        joinDate: Date!
        favourites: [Recipe]
    }

    type Token {
        token: String!
    }

    type Profile {
        user: User
        favRecipes: [Recipe]
        createdRecipes: [Recipe]
    }

    type Query {
        getAllRecipes: [Recipe]
        getRecipe(id:ID!): Recipe
        getUser(token: String!): User
        getProfile(token: String!): Profile
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

        deleteRecipe(id: ID!) : Recipe

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