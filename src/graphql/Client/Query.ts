import { allClients, findClientById } from "../../controller/Client/Client"

const greeting = () => {
    return "Hello GraphQL"
}

const resolvers = {
    greeting, allClients,
    findClientById,
}


export default resolvers