import Query from "./Query"
import { makeExecutableSchema } from 'graphql-tools';
import Mutation from "./mutations"
import fs from "fs"
import path from "path"

const resolvers = {
    Query,
    Mutation
}

const typeDefs = fs.readFileSync(path.join(__dirname, "../schema/client.graphql"), { encoding: "utf-8" })
const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema