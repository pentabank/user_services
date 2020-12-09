import { connect, getConnection } from "../../models/db"
<<<<<<< HEAD
import { addClient, deleteClientById, findClientByIdOrEmail, updateClient } from "./Client"
=======
import { addClient, deleteClientById, findClientById, updateClient } from "./Client"
>>>>>>> feat/user-creation

const good_client = {
    id: "5fca3891090a8f150c56ca7a",
    firstName: "Cheikh Gueye",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
<<<<<<< HEAD
=======
    isActive: false,
>>>>>>> feat/user-creation
    age: 24,
    email: "cheikhgwae@gmail.com",
    password: "test"
}

const bad_client = {
    id: "5fca76a90aa6d63ee4e0fef8",
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
<<<<<<< HEAD
=======
    isActive: false,
>>>>>>> feat/user-creation
    age: 24,
    email: "cheikhgwane@gmail.com",
}

const bad_client_2 = {
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
<<<<<<< HEAD
=======
    isActive: false,
>>>>>>> feat/user-creation
    age: 24,
    password: "",
    email: "cheikhgwe@gmail.com",
    dummy: "dummy"
}

<<<<<<< HEAD
=======
describe("Client insertion tests", () => {

    beforeAll(async () => connect())
    afterAll(async () => {
        let db = getConnection()
        db.close()
    })

    it('Should insert a new client', async () => {
        let res = await addClient(null, { good_client })
        expect(res.code).toBe(200)
    })

    it('Should fail when inserting a new client', async () => {
        let res = await addClient(null, { bad_client })
        expect(res.code).toBe(400)
    })

    it("Passing an empty object", async () => {
        let res = await addClient(null, { client: {} })
        expect(res.code).toBe(400)
    })

    it("Passing an object with more attributes", async () => {
        let res = await addClient(null, { bad_client_2 })
        expect(res.code).toBe(400)
    })
})

>>>>>>> feat/user-creation
describe("Find client by Id test", () => {

    beforeAll(async () => {
        await connect()

    })

    afterAll(async () => {
        let db = getConnection()
        await db.close()
    })

    it("Should retrieve a user given his id", async () => {
<<<<<<< HEAD
        await expect(findClientByIdOrEmail(null, { id: "5fca2c4b6b952f85fe45a" })).rejects.toThrow()
    })

    it("Should retrieve a user given his id", async () => {
        await expect(findClientByIdOrEmail(null, { id: "5fca3891090a8f150c56ca7a" })).resolves.toBeDefined()
=======
        await expect(findClientById(null, { id: "5fca2c4b6b952f85fe45a" })).rejects.toThrow()
    })

    it("Should retrieve a user given his id", async () => {
        await expect(findClientById(null, { id: "5fca3891090a8f150c56ca7a" })).resolves.toBeDefined()
>>>>>>> feat/user-creation
    })

})

describe("Update client", () => {

    beforeAll(async () => {
        await connect()

    })

    afterAll(async () => {
        let db = getConnection()
        await db.close()
    })

    it("Should not pass if client doesnt exist", async () => {
        await expect(updateClient(null, { client: bad_client })).rejects.toThrow()
    })

    it("Update should pass", async () => {
<<<<<<< HEAD
        await expect(findClientByIdOrEmail(null, { client: good_client })).resolves.toBeDefined()
=======
        await expect(findClientById(null, { client: good_client })).resolves.toBeDefined()
>>>>>>> feat/user-creation
    })

})


describe("Delete client", () => {

    beforeAll(async () => {
        await connect()

    })

    afterAll(async () => {
        let db = getConnection()
        await db.close()
    })

    it("Should not pass if client doesnt exist", async () => {
        await expect(deleteClientById(null, { id: "5fca7b82058faa52f0ec77e9" })).resolves.toBeDefined()
    })

    it("Deletion should pass", async () => {
<<<<<<< HEAD
        await expect(findClientByIdOrEmail(null, { id: "5fca3891090a8f150c56ca7z" })).rejects.toThrow()
=======
        await expect(findClientById(null, { id: "5fca3891090a8f150c56ca7z" })).rejects.toThrow()
>>>>>>> feat/user-creation
    })

})



