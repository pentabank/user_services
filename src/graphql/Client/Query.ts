import { allClients, findClientByIdOrEmail } from "../../controller/Client/Client"

import { regenerateToken, login } from "../../controller"
const greeting = () => {
    return "Hello GraphQL"
}

const resolvers = {
    greeting, allClients,
    findClientByIdOrEmail,
    regenerateToken, login
}


export default resolvers