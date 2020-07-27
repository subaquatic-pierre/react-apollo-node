import { GET_USER } from '../queries/getUser';

const token = localStorage.getItem('token');

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