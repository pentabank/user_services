import express from "express"
import logger from "./src/utils/logger"
import dotenv from "dotenv"
import { connect } from "./src/models/db"
import { addClient } from "./src/controller/Client"
import schema from "./src/graphql/Client"
const graphQLHTTP = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default

const PORT = process.env.PORT || 3000


let app = express()
dotenv.config()


app.use(logger)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})

app.use('/graphql', graphQLHTTP.graphqlHTTP({ schema: schema }))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))


app.get('/', function (req, res) {
    res.send('hello, world!')
})

const client = {
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
    isActive: false,
    age: 24,
    email: "cheikhgwane@gmail.com",
}

addClient(client).then(res => console.log(res))
console.log(connect())