import Query from "./Query"
import { makeExecutableSchema } from 'graphql-tools';
import fs from "fs"
import path from "path"


const typeDefs = fs.readFileSync(path.join(__dirname, "./client.graphql"), { encoding: "utf-8" })
const schema = makeExecutableSchema({ typeDefs, resolvers: Query })

console.log(path.join(__dirname, "./client.graphql"))

export default schema