import express from "express"
import logger from "./src/utils/logger"
import dotenv from "dotenv"
import { connect } from "./src/models/db"
import schema from "./src/graphql/Client"


const graphQLHTTP = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default

const PORT = process.env.PORT || 3000
let app = express()

dotenv.config()
app.use(logger)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
})

app.use('/graphql', graphQLHTTP.graphqlHTTP({ schema: schema }))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
connect()