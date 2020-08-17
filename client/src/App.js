import React from 'react';
import { InMemoryCache, ApolloLink, HttpLink, ApolloClient, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout'
import BaseRouter from './routes'

// create auth link
const authLink = new ApolloLink((operation, forward) => {
  // check user is authorized on each server request
  // remove token from local storage if token has expired
  // get token from local storage
  const token = localStorage.getItem('token')
  // set auth header to send to server
  operation.setContext({
    headers: {
      authorization: token ? token : '',
    }
  });

  // get response object
  return forward(operation).map(response => {

    // get context from reponse object
    const context = operation.getContext();

    // get headers of reponse object
    const { response: { headers } } = context;

    // if headers exist, get auth token
    if (headers) {
      // get token from headers
      const authToken = headers.get('authorization')
      const refreshToken = headers.get('Access-Control-Refresh-Token')

      // refresh token if refresh token on header
      if (refreshToken) {
        localStorage.setItem('token', refreshToken)
      }

      // if not just logged in and token is expired, remove token from local storage
      if (authToken === 'expired' && !response.data.loginUser) {
        localStorage.removeItem('token')
      }
    }

    return response;
  })
})

// create link to server
const httpLink = new HttpLink({ uri: 'https://apollo-react-recipes-app.herokuapp.com/' });

// create new apollo client
const client = new ApolloClient({
  // set link to ApolloLink and httpLink
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: (error) => {
    console.log(error)
  }
});

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <BaseRouter />
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
