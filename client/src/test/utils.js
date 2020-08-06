// test-utils.js
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { render, queries } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { createApolloMockedProvider } from 'apollo-mocked-provider';
import { typeDefs } from './typeDefs';
import * as customQueries from './customQueries'

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs, { provider: ApolloProvider });

const customRender = (ui, customResolvers = {}, options) => {
    const Wrapper = ({ children }) => {
        return (
            <ApolloMockedProvider customResolvers={customResolvers}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </ApolloMockedProvider>
        )
    }
    return render(ui, {
        wrapper: Wrapper,
        queries: { ...queries, ...customQueries },
        ...options
    })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }