import React from 'react';
import withAuth from './withAuth'
import Profile from '../components/Profile'
import { GET_USER } from '../queries/getUser';
import { GET_PROFILE } from '../queries/getProfile';
import wait from 'waait'
import { MockedProvider } from '@apollo/client/testing';
import { mount, shallow } from 'enzyme';

export const mountSetup = (Component, mocks = [], props = {}) => {
    return mount(
        <MockedProvider client={mocks} addTypename={false}>
            <Component {...props} />
        </MockedProvider>
    )
}

const token = 'token'

const unauthorizedMocks = [
    {
        request: {
            query: GET_USER,
            variables: {
                token
            }
        },
        result: {
            data: {
                getUser: {
                    username: null
                }
            }
        }
    },
]

// const authorizedMocks = [
//     {
//         request: {
//             query: GET_USER,
//             variables: {
//                 token
//             }
//         },
//         result: {
//             data: {
//                 getUser: null
//             }
//         }
//     },
// ]

describe('unauthorized tests', () => {
    let component;
    beforeEach(() => {
        component = mountSetup(withAuth(Profile), unauthorizedMocks)
    })

    it('redirect when user not logged in', async () => {
        // component = mountSetup(withAuth(Profile), unauthorizedMocks)
        await wait(0)
        console.log(component.debug())
    })
})

// it('redirect when user not logged in', async () => {
//     const component = mountSetup(withAuth(Profile), unauthorizedMocks)
//     await wait(0)
//     console.log(component.debug())
// })

// it('renders profile page when user is logged in', async () => {
//     const component = mountSetup(withAuth(Profile), authorizedMocks)
//     await new Promise(resolve => setTimeout(resolve, 0));
//     console.log(component.debug())
// })





































// {
//     request: {
//         query: GET_PROFILE,
//         variables: {
//             token
//         }
//     },
//     result: {
//         data: {
//             getProfile: {
//                 user: {
//                     _id: "5f196bb8264fd02b0ed25fcf",
//                     username: "Pierre",
//                     email: "user",
//                     joinDate: "2020-07-23T10:51:36.090Z",
//                     favourites: []
//                 },
//                 createdRecipes: [],
//                 favRecipes: []
//             }
//         }
//     }
// },

// {
//     request: {
//         query: GET_PROFILE,
//         variables: {
//             token
//         }
//     },
//     result: {
//         data: {
//             getProfile: null
//         }
//     }
// },