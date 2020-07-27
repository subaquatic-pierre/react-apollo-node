import { GET_USER } from '../queries/getUser';
import { GET_PROFILE } from '../queries/getProfile';

import getUser from '../auth/getUser';
import getProfile from '../auth/getProfile';

const token = localStorage.getItem('token')

const updateProfileFavs = (store, profile, favs) => {
    try {
        store.writeQuery({
            query: GET_PROFILE,
            variables: { token },
            data: {
                getProfile: {
                    user: {
                        ...profile.user,
                        favourites: favs
                    },
                    favRecipes: favs
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}

const updateUserFavs = (store, user, favs) => {
    try {
        store.writeQuery({
            query: GET_USER,
            variables: { token },
            data: {
                getUser: {
                    ...user,
                    favourites: favs
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}

const updateFavs = (store, favs) => {
    const user = getUser(store)
    const profile = getProfile(store)

    updateProfileFavs(store, profile, favs)
    updateUserFavs(store, user, favs)
}

export default updateFavs