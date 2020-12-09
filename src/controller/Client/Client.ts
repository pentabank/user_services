import { hashPassword } from "..";
import Client from "../../models/Client"
import { getError } from "../../utils/message";
import { validate } from "../../utils/validator";

function operationMessage(code: number, content: string, data: Object) {
    return { code: code, content: content, data: data }
}

export async function allClients() {
    return Client.find()
}

export async function addClient(parent: any, args: any) {
    const { client } = args
    try {
        validate(client)
        let objectExist = await Client.findOne({ $or: [{ email: client.email }, { phoneNumber: client.phoneNumber }, { CIN: client.CIN }] }).exec()

        if (objectExist) {
            throw Error("Client already created")
        }

        const password = await hashPassword(client.password)

        let _client = new Client({ ...client, password: password });
        let res = await _client.save()

        return res
    } catch (err) {
        let errors = getError(err)
        console.log(errors)
        throw err
        /*  return operationMessage(400, "An error occured while trying to insert a new client. See error(s) below for more details", errors) */

    }
}


export async function updateClient(parent: any, args: any) {
    const { client } = args
    console.log(client)
    try {
        let res = await Client.findOneAndUpdate({ _id: client._id }, { ...client }, { new: true, useFindAndModify: true }).lean()
        if (!res) {
            throw new Error("Client doesn't exist")
        }
        return res
    } catch (error) {
        throw error
    }
}

export async function findClientByIdOrEmail(parent: any, args: any) {
    const { id, email } = args
    try {
        let res = await Client.findOne({ $or: [{ _id: id }, { email: email }] }).lean()
        return res
    } catch (error) {
        throw new Error("Bad Id format")
    }
}

export async function deleteClientById(parent: any, args: any) {
    const { id } = args
    try {
        let res = await Client.findByIdAndDelete(id)
        return res
    } catch (error) {
        throw new Error("Bad Id format")
    }
}