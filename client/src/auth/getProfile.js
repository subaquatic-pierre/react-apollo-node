import { GET_PROFILE } from '../queries/getProfile';
import { getToken } from '../utils/getToken';

const token = getToken()

const getProfile = (client) => {
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

export default getProfile