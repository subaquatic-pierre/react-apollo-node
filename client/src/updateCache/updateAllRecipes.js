import { GET_ALL_RECIPES } from '../queries/allRecipes';

const updateAllRecipes = (store, recipes) => {
    try {
        store.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: recipes
            }
        })
    } catch (err) {
        window.location.assign('/')
        console.log(err)
    }
}

export default updateAllRecipes
