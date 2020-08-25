# React Apollo Recipes App

This app is designed for users to create recipes and share them with their friends, leveraging the power of React, Apollo and GraphQL.

Emphasis was placed on testing React components with React Testing Library.

All queries and mutations to the database are optimistically updated within the UI before being updated from server data.

It is hosted with AWS on an EC2 instance, domain management is done with Route 53.

The front-end is served with ApolloClient while the backend utilizes ApolloServer.

The back-end server is connected to a MongoDB which is hosted locally on the EC2 instance.

### Website URL:

[recipes-app](recipes.ballot-online.com)

## Features:

- User login / logout
- Create / Delete recipes
- Like recipes

## Technologies

- React
- Apollo Client
- Apollo Server
- React Testing Library
- Mongo DB
- GraphQL
