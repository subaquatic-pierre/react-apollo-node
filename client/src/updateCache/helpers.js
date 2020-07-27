import { GET_ALL_RECIPES } from '../queries/allRecipes';

/**
 * @funtion removeRecipe - Removes the recipe with the given id from the recipe list
 * @param {Array} recipes | Array of recipes
 * @param {String} recipeId | String of recipe ID
 * @returns {Array} | Updated list of recipes
 */

export const removeRecipe = (recipes, recipeId) => {
    return recipes.filter(recipe => recipe._id !== recipeId)
}

export const addRecipe = (recipes, recipe) => {
    return [recipe, ...recipes]
}

// check if the recipe is already liked by the user
export const checkRecipeLiked = (favs, recipeId) => {
    let liked = false
    favs.forEach(fav => {
        if (fav._id === recipeId) {
            liked = true
        }
    })
    return liked
}

// get favourites array of recipe ID's from user, return empty array if no user
export const getFavourites = (user) => {
    try {
        const favs = user.favourites
        return favs
    } catch {
        return []
    }
}

export const getAllRecipes = store => {
    try {
        const recipeData = store.readQuery({
            query: GET_ALL_RECIPES,
        })
        return recipeData.getAllRecipes
    } catch (err) {
        return undefined
    }
}