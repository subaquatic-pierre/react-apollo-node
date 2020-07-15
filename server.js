import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apollo from 'apollo-server'
import jwt from 'jsonwebtoken';

// import models
import User from './models/User.js';
import Recipe from './models/Recipe.js';

// import resolvers and typeDefs (GraphQL schema)
import { typeDefs } from './schema/schema.js';
import { resolvers } from './schema/resolvers.js';
import getSecretKey from './helpers/getSecretKey.js';

// destructure server from apollo object import
const { ApolloServer } = apollo;

// initialize process.env
dotenv.config({ path: 'config.env' })

// import variables from config.env
const DB_URI = process.env.DB_URI



// setup apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization
        if (token) {
            try {
                const currentUser = await jwt.verify(token, getSecretKey())
                if (currentUser) {
                    console.log(currentUser)
                }
            } catch (err) {
                console.log(err)
                throw new Error(err)
            }
        }
        return {
            User,
            Recipe
        }
    },
    tracing: true
});


server.listen().then(() => {
    console.log('🚀  Server ready at http://localhost:4000/')
})

// connect to database from config variables
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
).then(() => console.log(`Connected to database at ${DB_URI}`)).catch(err => console.log(err));
