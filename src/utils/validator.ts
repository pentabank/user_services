import { GraphQLError } from "graphql"
import ERROR from "./error_message.json"
import { ClientCreationInput } from "../GraphQLTypes/types"

export class ClientCreationError extends Error {
    err: string[] = []
    constructor(errors: string[]) {
        super('The request is invalid.');
        this.err = errors
        this.name = "ClientCreationError"
    }


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
    const { password, confirmPassword, CIN, age, isActive, ...remaining } = client
    for (const [key, value] of Object.entries(remaining)) {
        if (!value.length) {
            errors.push(`${key.toUpperCase()} musn't be null`)
        }
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