import { GET_ALL_RECIPES } from '../queries/allRecipes'

const addRecipeToCache = (store, recipe) => {
    try {
        const existingRecipes = store.readQuery({
            query: GET_ALL_RECIPES
        })
        store.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [recipe, ...existingRecipes.getAllRecipes]
            }
        })
    } catch (err) {
        window.location.assign('/')
        console.log(err)
    }
}

export default addRecipeToCache
