import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    ){
      signupUser(
        username: $username, 
        email: $email, 
        password: $password
      ){
        token
      }
  }
`