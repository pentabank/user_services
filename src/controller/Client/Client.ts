import { GraphQLError } from "graphql";
import { hashPassword } from "..";
import Client from "../../models/Client"
import { validate } from "../../utils/validator";
import { checkAccesLevel } from "../../utils/wrapper";

function operationMessage(code: number, content: string, data: Object) {
    return { code: code, content: content, data: data }
}

export async function allClients(parent: any, args: any, context: any) {
    try {
        await checkAccesLevel(context)
    } catch (error) {
        throw error
    }
    return Client.find()
}

export async function addClient(parent: any, args: any, context: any) {
    const { client } = args
    try {
        if (context) {
            await checkAccesLevel(context)
        }
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
        throw err
        /*  return operationMessage(400, "An error occured while trying to insert a new client. See error(s) below for more details", errors) */

    }
}


export async function updateClient(parent: any, args: any, context: any) {
    const { client } = args
    try {
        if (context) {
            await checkAccesLevel(context)
        }
        let res = await Client.findOneAndUpdate({ _id: client._id }, { ...client }, { new: true, useFindAndModify: true }).lean()
        if (!res) {
            throw new Error("Client doesn't exist")
        }
        return res
    } catch (error) {
        throw error
    }
}

export async function findClientByIdOrEmail(parent: any, args: any, context: any) {
    const { id, email } = args
    try {

        let res = await Client.findOne({ $or: [{ _id: id }, { email: email }] }).lean()
        return res
    } catch (error) {
        throw error
    }
}

export async function deleteClientById(parent: any, args: any, context: any) {
    const { id } = args
    try {
        await checkAccesLevel(context)
        let res = await Client.findByIdAndDelete(id)
        return res
    } catch (error) {
        throw new Error("Bad Id format")
    }
}