import { connect, getConnection } from "../../models/db"
import { addClient, findClientById } from "./Client"

const good_client = {
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
    isActive: false,
    age: 24,
    email: "cheikhgwae@gmail.com",
    password: "test"
}

const bad_client = {
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

const bad_client_2 = {
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "Derkle",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
    isActive: false,
    age: 24,
    password: "",
    email: "cheikhgwe@gmail.com",
    dummy: "dummy"
}

/* describe("Client insertion tests", () => {

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
}) */

describe("Find client by Id test", () => {

    beforeAll(async () => {
        await connect()

    })

    afterAll(async () => {
        let db = getConnection()
        await db.close()
    })

    it("Should retrieve a user given his id", async () => {
        await expect(findClientById(null, { id: "5fca2c4b6b952f85fe45a" })).rejects.toThrow()
    })

    it("Should retrieve a user given his id", async () => {
        await expect(findClientById(null, { id: "5fca3891090a8f150c56ca7a" })).resolves.toBeDefined()
    })

})


