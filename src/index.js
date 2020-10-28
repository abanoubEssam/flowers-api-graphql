const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { userMutations } = require("./graphql/resolvers/mutations/user/user.mutations");
const { userTypeDef } = require("./graphql/type-definitions/user/user.typedef");
import { AwakeHeroku } from 'awake-heroku';
import config from 'config';
import express from 'express';
import path from 'path';
import { shopMutations } from './graphql/resolvers/mutations/shop/shop.mutations';
import { shopQueries } from './graphql/resolvers/queries/shop/shop.queries';
import { userQueries } from './graphql/resolvers/queries/user/user.queries';
import { shopTypeDef } from './graphql/type-definitions/shop/shop.typedef';
import { validateToken } from './middlewares/jwt.service';
const app = express()
const uploadPath = path.resolve(__dirname, '../uploads')
const publicPath = path.resolve(__dirname, '../public')
console.log("publicPath", publicPath)

app.use('/uploads', express.static(uploadPath))
app.use('/static', express.static(publicPath))

app.use('/hamada', (req, res, next) => {
    // console.log("REQ" , req);
    res.send('hamada')
    next()
})

AwakeHeroku.add({
    url: "https://ionian-cotton-aerosteon.glitch.me/hamada"
})

console.log("uploadPath", uploadPath)
const server = new ApolloServer({
    tracing: true,

    typeDefs: [
        userTypeDef,
        shopTypeDef
    ],
    resolvers: {
        Query: {
            sayHi: () => {
                return 'hey all'
            },
            ...userQueries,
            ...shopQueries
        },
        Mutation: {
            ...userMutations,
            ...shopMutations,
        }
    },
    context: async ({ req }) => {
        // console.log("req.body", req.body)
        let user;
        if (req.headers.authorization) {
            user = await validateToken(req.headers.authorization)
            return user
        }
        return { req, user }
    },
    playground: true,
    introspection: true

})

const port = process.env.PORT || 3000

server.applyMiddleware({ app })
console.log("NODE-ENV", process.env.NODE_ENV);
app.listen({ port }, async () => {
    await mongoose.connect(config.get('mongodbURL'), { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`db connected to ${config.get('mongodbURL')}`)
    console.log(`🚀 Server ready at ${config.get('server.protocol')}://${config.get('server.host')}:${port}${server.graphqlPath}`)

}
)
// app.listen({ port }).then(async res => {
//     try {
//     } catch (error) {
//         console.log("error", error)

//     }
//     console.log(`SERVER IS UP ${res.url}`);
// })