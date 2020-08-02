// test-utils.js
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing'

const customRender = (ui, mocks = [], resolvers = {}, options) => {
    const Wrapper = ({ children }) => {
        return (
            <MockedProvider
                mocks={mocks}
                resolvers={resolvers}
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