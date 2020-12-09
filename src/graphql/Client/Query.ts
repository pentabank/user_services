<<<<<<< Updated upstream

const CLIENTS = [
    {
        firstName: "Cheikh G",
        lastName: "Wane",
        dateOfBirth: "04/10/1996",
        CNI: "1896199600180",
        address: "Derkle",
        phoneNumber: "221771974257",
        createdAt: "01/12/2020",
        isActive: false,
        age: 24,
        email: "cheikhgwane@gmail.com",
    },
]


const resolvers = {
    Query: {
        greetings: () => greeting(),
        allClients: () => CLIENTS
    }
}
=======
import { allClients, findClientByIdOrEmail } from "../../controller/Client/Client"

import { regenerateToken, login } from "../../controller"
>>>>>>> Stashed changes

const greeting = () => {
    return "Hello GraphQL"
}

<<<<<<< Updated upstream

function addClient() {
=======
const resolvers = {
    greeting, allClients,
    findClientByIdOrEmail,
    regenerateToken, login
}
>>>>>>> Stashed changes

}

export default resolvers