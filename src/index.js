const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { mongodbURL } = require("./constants");
const { userMutations } = require("./graphql/resolvers/mutations/user/user.mutations");
const { userTypeDef } = require("./graphql/type-definitions/user/user.typedef");
import express from 'express';
import path from 'path';
import { userQueries } from './graphql/resolvers/queries/user/user.queries';
import { validateToken } from './middlewares/jwt.service';

const app = express()
const uploadPath = path.resolve(__dirname, '../uploads')
app.use('/uploads', express.static(uploadPath))

console.log("uploadPath", uploadPath)
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

const port = process.env.PORT || 3000

server.applyMiddleware({ app })

app.listen({ port }, async () => {
    await mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`db connected to ${mongodbURL}`)
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)

}
)
// app.listen({ port }).then(async res => {
//     try {
//     } catch (error) {
//         console.log("error", error)

//     }
//     console.log(`SERVER IS UP ${res.url}`);
// })