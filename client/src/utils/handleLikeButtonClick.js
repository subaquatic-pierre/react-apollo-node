import updateFavs from '../updateCache/updateUserFavs';
import { removeRecipe, addRecipe } from '../updateCache/helpers';

const handleLikeClick = (recipeId, { user, liked, addLike, removeLike, userLiked = true }) => {
    // if user already likes recipe choose to `removeLike` mutation else `addLike` mutation
    if (liked) {
        removeLike({
            variables: { id: recipeId },
            update: (store, data) => {
                // remove recipe from current recipes
                const recipes = user.favourites
                const newFavs = removeRecipe(recipes, recipeId)

                // update `getUser` query with optomistic response
                updateFavs(store, newFavs)
            }
        })
    } else {
        userLiked = !userLiked
        addLike({
            variables: { id: recipeId },
            update: (store, data) => {
                // add recipe to current recipes
                const favourites = user.favourites
                const newRecipe = { __typename: "Recipe", _id: recipeId }
                const newFavs = addRecipe(favourites, newRecipe)

                // update `getUser` query with optomistic response
                updateFavs(store, newFavs)
            }
        })
    }
}

export default handleLikeClick