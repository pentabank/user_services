
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
        allClients: () => CLIENTS,
        objectionCreationError: (args: any) => objectionCreationError(parent, args)
    }
}

const greeting = () => {
    return "Hello GraphQL"
}


function objectionCreationError(parent: any, args: any) {
    throw new Error(args)
}

export default resolvers