// test-utils.js
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache } from '@apollo/client/testing'
import { MockedProvider } from '@apollo/client/testing'

import { GET_USER } from '../queries/getUser';

const customRender = (ui, mocks = [], options) => {
    const Wrapper = ({ children }) => {
        return (
            <MockedProvider
                mocks={mocks}
                addTypename={false}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </MockedProvider>
        )
    }
    return render(ui, { wrapper: Wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

export const authUserMock = {
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

export const unAuthUserMock = {
    request: {
        query: GET_USER,
        variables: { token: 'token' }
    },
    result: {
        data: {
            getUser: null
        }
    }
}