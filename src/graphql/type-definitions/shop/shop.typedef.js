const { gql } = require('apollo-server');

export const shopTypeDef = gql`

  input placeInput {
      lat: Int!
      lng: Int!
  }
  type Place {
      lat: Int!
      lng: Int!
  }
  input createShopInput{
      name: String!
      place: placeInput!
      shopImg: Upload
  }
  type Shop {
    id: ID!
    name: String!
    owner: User!
    shopImg: String
    place: Place!
    createdAt: String!
    updatedAt:String!
  }

  extend type Query {
    getShops(page: Int , limit: Int) : [Shop!]!
  }

  extend type Mutation {
    createShop(input: createShopInput): Shop!
  }

`