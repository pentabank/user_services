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
    let _client = new Client(client);
    try {
        validate(client)
        let objectExist = await Client.findOne({ $or: [{ email: client.email }, { phoneNumber: client.phoneNumber }, { CIN: client.CIN }] }).exec()
        if (objectExist) {
            throw Error("Client already created")
        }
        let res = await _client.save()
        return operationMessage(200, "Client inserted", [res.id])
    } catch (err) {
        let errors = getError(err)
        return operationMessage(400, "An error occured while trying to insert a new client. See error(s) below for more details", errors)
    }
}


export async function updateClient(parent: any, args: any) {
    const { client } = args
    let _client = new Client(client);
    try {
        let res = await Client.findOneAndUpdate({ _id: _client.id }, { ...client }, { new: true })
        if (!res) {
            throw new Error("Client doesn't exist")
        }
        return res
    } catch (error) {
        throw error
    }
}

export async function findClientById(parent: any, args: any) {
    const { id } = args
    try {
        let res = await Client.findById(id)
        return res
    } catch (error) {
        throw error
        /*   throw new Error("Bad Id format") */
    }
}