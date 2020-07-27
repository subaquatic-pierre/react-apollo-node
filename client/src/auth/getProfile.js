import { GET_PROFILE } from '../queries/getProfile';

const token = localStorage.getItem('token');

const getUser = (client) => {
    try {
        const profileData = client.readQuery({
            query: GET_PROFILE,
            variables: { token }
        })
        return profileData.getProfile
    } catch (err) {
        return undefined
    }
}

export default getUser