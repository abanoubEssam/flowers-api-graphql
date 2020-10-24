const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { mongodbURL } = require("./constants");
const { userMutations } = require("./graphql/resolvers/mutations/user/user.mutations");
const { userTypeDef } = require("./graphql/type-definitions/user/user.typedef");
import express from 'express';
import { join } from 'path';
import { userQueries } from './graphql/resolvers/queries/user/user.queries';
import { validateToken } from './middlewares/jwt.service';

const app = express()
app.use('/uploads', express.static(join(__dirname, '../uploads')))

const server = new ApolloServer({
    typeDefs: [
        userTypeDef
    ],
    resolvers: {
        Query: {
            sayHi: () => {
                return 'hey all'
            },
            ...userQueries
        },
        Mutation: {
            ...userMutations
        }
    },
    context: async ({ req }) => {
        // console.log("req.body", req.body)
        if (req.headers.authorization) {
               return await validateToken(req.headers.authorization)
        }
    },
    // playground: false

})

const port = process.env.PORT || 8000

server.listen({ port }).then(async res => {
    try {
        await mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`db connected to ${mongodbURL}`)
    } catch (error) {
        console.log("error", error)

    }
    console.log(`SERVER IS UP ${res.url}`);
})