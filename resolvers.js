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
        }
    }
}