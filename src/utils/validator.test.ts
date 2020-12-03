import { addClient } from "../controller/Client"
import { validate } from "./validator"

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
    email: "cheikhgwae@gmail.com",
    password: "Inferno12@",
    confirmPassword: "Inferno12@"
}


const client_2 = {
    firstName: "Cheikh G",
    lastName: "Wane",
    dateOfBirth: "04/10/1996",
    CIN: "1896199600180",
    address: "",
    phoneNumber: "221771974257",
    createdAt: "01/12/2020",
    isActive: false,
    age: 24,
    email: "cheikhgwae@gmail.com",
    password: "inferno",
    confirmPassword: "@"
}

describe("Validator function testing", () => {
    it("All fields have value", () => {
        expect(() => validate(client)).not.toThrow()
    })

    it("Incorrect input", () => {
        expect(() => validate(client_2)).toThrow()
    })
})