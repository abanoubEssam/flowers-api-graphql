const { gql } = require('apollo-server');

export const shopTypeDef = gql`

  input placeInput {
      lat: Int!
      lng: Int!
  }
  input placeSearchInput {
      lat: Int!
      lng: Int!
      radius: Int
  }
  type Place {
      lat: Int!
      lng: Int!
  }
  type PlaceResult {
      latitude: Int!
      longitude: Int!
  }
  input createShopInput{
      name: String!
      place: placeInput
      shopImg: Upload
  }
  input updateShopInput{
      id: ID!
      name: String
      place: placeInput
      shopImg: Upload
  }
  type Shop {
    id: ID!
    name: String!
    owner: User!
    shopImg: String
    place: Place
    createdAt: String!
    updatedAt:String!
  }

  type ShopResult {
    id: ID!
    name: String!
    owner: User!
    shopImg: String
    place: PlaceResult
    createdAt: String!
    updatedAt:String!
  }

  extend type Query {
    getShops(page: Int , limit: Int , place: placeSearchInput , owner: ID , name: String , id: ID) : [ShopResult!]!
  }

  extend type Mutation {
    createShop(input: createShopInput): Shop!
    updateShop(input: updateShopInput): Shop!
    deleteShop(id: ID!): Boolean!
  }

`