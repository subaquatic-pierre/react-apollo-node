import { GET_USER } from '../queries/getUser';
import { getToken } from '../utils/getToken';

const token = getToken()

const getUser = (client) => {
    try {
        const user = client.readQuery({
            query: GET_USER,
            variables: { token }
        })
        return user.getUser
    } catch (err) {
        return undefined
    }
}

export default getUser