import createJWT from '../helpers/createJWT.js'
import bcrypt from 'bcrypt';
import getUser from '../helpers/getUser.js';

export const resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find()
                .populate('user').sort({ createdDate: 'descending' })
            return allRecipes
        },
        getRecipe: async (root, { id }, { Recipe }) => {
            const recipe = Recipe.findOne({ _id: id })
            return recipe
        },
        getUser: async (root, { token }, { User }) => {
            // use `getUser` function to find user with token
            const currentUser = await getUser(token)

            // if user found return user or null if no user
            if (currentUser) return currentUser
            return null
        },
        recipeSearch: async (root, { searchTerm }, { Recipe }) => {
            // return all recipes if no serach term
            if (!searchTerm) {
                const results = await Recipe.find()
                return results
            }

            // find recipes which match search term
            const searchResults = await Recipe.find({
                $text: { $search: searchTerm }
            },
                // add score meta data to each search result
                {
                    score: { $meta: "textScore" }
                    // sort by best textScore
                }).sort({
                    score: { $meta: "textScore" }
                })

            return searchResults
        }
    },
    Mutation: {
        resetLikes: async (root, args, { Recipe }) => {
            const recipes = await Recipe.find()

            recipes.forEach(recipe => {
                recipe.likes = 0
                recipe.save()
            })

            return recipes
        },
        addRecipe: async (root, { name, category, description, instructions }, { Recipe, User, currentUser }) => {
            // check user is logged in
            if (!currentUser) throw new Error('User not logged in')

            // create and save new recipe
            const newRecipe = await new Recipe({
                name,
                category,
                description,
                instructions,
                username: user.username
            }).save()

            return newRecipe
        },
        addLike: async (root, { id }, { Recipe, User, currentUser }) => {
            // check user is logged in
            if (!currentUser) throw new Error('User not logged in')

            // get recipe from database, update likes by one increment
            const recipe = await Recipe.findOne({ _id: id })
            recipe.likes += 1
            recipe.save()

            // find and add to user likes array
            await User.findOneAndUpdate({ username: currentUser.username }, { $addToSet: { favourites: id } })

            return recipe
        },
        removeLike: async (root, { id }, { Recipe, User, currentUser }) => {
            // check user is logged in
            if (!currentUser) throw new Error('User not logged in')

            // get recipe from database
            const recipe = await Recipe.findOne({ _id: id })

            // if likes is not 0, decrement by one
            if (recipe.likes > 0) {
                recipe.likes -= 1
                recipe.save()
            }

            // find user and update likes array, remove like from array
            await User.findOneAndUpdate({ username: currentUser.username }, { $pullAll: { favourites: [id] } })

            return recipe
        },
        loginUser: async (root, { username, password }, { User, currentUser }) => {
            // find user
            const user = await User.findOne({ username: username })

            // throw error if user not found
            if (!user) throw new Error('User not found')

            // validate password, throw error if not correct password
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) throw new Error('Incorrect password')

            // return valid token if correct credentials
            return ({
                token: createJWT(user),
            })
        },
        signupUser: async (root, { username, password, email }, { User }) => {
            // find user
            const user = await User.findOne({ username: username })

            // user already exists, throw error
            if (user) throw new Error('User already exists')

            // create new user
            const newUser = await new User({
                username: username,
                password: password,
                email: email
            }).save()

            // return valid token
            return ({ token: createJWT(newUser) })
        }
    }
}