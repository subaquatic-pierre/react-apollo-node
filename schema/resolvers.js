import createJWT from '../helpers/createJWT.js'

export const resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find()
            return allRecipes
        },
    },
    Mutation: {
        addRecipe: async (root, { name, category, description, instructions }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                category,
                description,
                instructions
            }).save()
            return newRecipe
        },
        signupUser: async (root, { username, password, email }, { User }) => {
            const user = await User.findOne({ username: username })

            if (user) {
                throw new Error('User already exists')
            }

            const newUser = await new User({
                username: username,
                password: password,
                email: email
            }).save()

            return ({ token: createJWT(newUser) })
        }
    }
}