import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apollo from 'apollo-server'
const { ApolloServer } = apollo;

// import models
import User from './models/User.js';
import Recipe from './models/Recipe.js';

// initialize process.env
dotenv.config({ path: 'config.env' })

// import variables from config.env
const DB_URI = process.env.DB_URI

// initialize express server
const app = express()

// import resolvers and typeDefs (GraphQL schema)
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Recipe
    },
    tracing: true
});

// connect to database from config variables
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log(`Connected to database at ${DB_URI}`))
    .catch(err => console.log(err));

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
