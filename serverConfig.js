import apollo from 'apollo-server'

// import models
import User from './models/User.js';
import Recipe from './models/Recipe.js';

// import resolvers and typeDefs (GraphQL schema)
import { typeDefs } from './schema/schema.js';
import { resolvers } from './schema/resolvers.js';
import getUser from './helpers/getUser.js';
import needToRefreshToken from './helpers/needToRefreshToken.js';
import createJWT from './helpers/createJWT.js';

// destructure server from apollo object import
const { ApolloServer } = apollo;

// setup apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        // expose headers for client
        res.set('Access-Control-Expose-Headers', '*')

        // get token from header or set empty string
        const token = req.headers.authorization || ''

        // get current user, returns expired if expired or null if error
        const currentUser = await getUser(token)

        // check if token needs to be refreshed
        const needToRefresh = await needToRefreshToken(token)

        // set refresh token on header
        if (needToRefresh) {
            res.setHeader('Access-Control-Refresh-Token', createJWT(currentUser))
        }

        // if currentUser is expired, set authorization header to expired
        if (currentUser === 'expired') {
            res.setHeader('authorization', 'expired')
        }

        // return context to resolvers
        return {
            User,
            Recipe,
            currentUser
        }
    },
    tracing: true
});

export default server;