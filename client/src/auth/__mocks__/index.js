import { GET_USER } from '../../queries/getUser';
import { GET_PROFILE } from '../../queries/getProfile'

export const mockGetUserQuerySuccess = {
    request: {
        query: GET_USER,
        variables: { token: 'token' }
    },
    result: {
        data: {
            getUser: {
                username: 'user',
                email: 'email',
                favourites: [],
            }
        }
    }
}

export const mockGetUserQueryFail = {
    request: {
        query: GET_USER,
        variables: { token: 'token' }
    },
    result: {
        data: {
            getUser: {
                username: 'user',
                email: 'email',
                favourites: [],
            }
        }
    }
}

export const getProfileQuerySuccess = {
    request: {
        query: GET_PROFILE,
        variables: { token: 'token' }
    },
    result: {
        data: {
            getProfile: {
                user: {
                    _id: '1',
                    username: 'user',
                    email: 'email',
                    joinDate: 'soon',
                    favourites: []
                },
                favourites: [],
                createdRecipes: [],
            }
        }
    }
}

