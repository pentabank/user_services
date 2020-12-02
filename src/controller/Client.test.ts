import { connect, getConnection } from "../models/db"
import { addClient } from "./Client"

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
    email: "cheikhgwane@gmail.com",
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
/*
test('Test adding client failed', async () => {
   return addClient(bad_client).then(res => {
       expect(res.code).toBe(400)
   })
}, 30000) */


describe("Client insertion tests", () => {

    beforeAll(async () => connect())
    afterAll(async () => {
        let db = getConnection()
        db.close()
    })

    it('Should insert a new client', async () => {
        let res = await addClient(good_client)
        expect(res.code).toBe(200)
    })

    it('Should fail when inserting a new client', async () => {
        let res = await addClient(bad_client)
        expect(res.code).toBe(400)
    })
})

