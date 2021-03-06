import express from "express"
import logger from "./src/utils/logger"
import dotenv from "dotenv"
import { connect } from "./src/models/db"
import schema from "./src/graphql/Client"
import authenticateJWt from "./src/middleware/VerifyToken"

const graphQLHTTP = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default
dotenv.config()

const PORT = process.env.PORT || 3030
let app = express()

app.use(logger)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}/graphql`);
})

//uncomment in prod environnement
app.use('/graphql', /* authenticateJWt, */ graphQLHTTP.graphqlHTTP({
    schema: schema,
}))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
connect()