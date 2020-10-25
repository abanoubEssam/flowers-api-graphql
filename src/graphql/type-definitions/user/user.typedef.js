const { gql } = require('apollo-server');

export const userTypeDef = gql`
input File {
    filename: String!
    mimetype: String!
    encoding: String!
}
  input signUpInput{
      email: String!
      name: String!
      password: String!
      profileImg: Upload
  }
  input loginInput{
      email: String!
      password: String!
  }
  type authResult{
      user: User!
      token: String!
  }
  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
    profileImg: String
    createdAt: String!
    updatedAt:String!
  }
  type Query {
    sayHi: String!
    getUsers(page: Int , limit: Int) : [User!]!
    login(input: loginInput): authResult!
  }
  type Mutation {
      signUp(input: signUpInput): authResult!
  }
`