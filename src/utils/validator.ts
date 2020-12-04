import { GraphQLError } from "graphql"
import ERROR from "./error_message.json"
import { ClientCreationInput } from "../GraphQLTypes/types"

export class ClientCreationError extends Error {
    err: string[] = []
    constructor(errors: string[]) {
        super('The request is invalid.');
        this.name = "ClientCreationError"
        this.err = errors
    }

    getErr() {
        return this.err
    }

}


function validateEmail(email: string) {
    let reg = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")
    return reg.test(email)
}


function validateCIN(cin: string) {
    //CIN format 13 digits no string
    let reg = new RegExp("[0-9]{13}")
    return reg.test(cin)
}


function validatePassword(password: string, confirmPassword: string): boolean {
    //Must have an uppercase special character digits
    let reg = new RegExp("(?=.*[A-Z]{1})(?=.*[a-z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?])")
    return reg.test(password)
}

/* function checkPhoneNumber() */

export function validate(client: ClientCreationInput) {
    let errors = []
    const { password, confirmPassword, CIN, email, age, isActive, ...remaining } = client
    for (const [key, value] of Object.entries(remaining)) {
        if (!value.length) {
            errors.push(`${key.toUpperCase()} musn't be null`)
        }
    }
    if (age <= 0) {
        errors.push(ERROR.CLIENT.AGE)
    }

    if (!validateEmail(email)) {
        errors.push(ERROR.CLIENT.EMAIL)
    }

    if (password !== confirmPassword) {
        errors.push(ERROR.CLIENT.CONFIRM)
    }
    if (!validatePassword(password, confirmPassword)) {
        errors.push(ERROR.CLIENT.PASSWORD_FORMAT)
    }

    if (!validateCIN(CIN)) {
        errors.push(ERROR.CLIENT.CIN)
    }
    if (errors.length) throw new ClientCreationError(errors)
}