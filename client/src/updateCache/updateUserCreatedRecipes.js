import { GET_PROFILE } from '../queries/getProfile';

const token = localStorage.getItem('token')

const updateUserCreatedRecipes = (store, recipes) => {
    try {
        const profileData = store.readQuery({
            query: GET_PROFILE,
            variables: { token }
        })
        const profile = profileData.getProfile
        store.writeQuery({
            query: GET_PROFILE,
            variables: { token },
            data: {
                getProfile: {
                    ...profile,
                    createdRecipes: recipes
                }
            }
        })
    } catch (err) {
        window.location.assign('/')
        console.log(err)
    }

}

export default updateUserCreatedRecipes;