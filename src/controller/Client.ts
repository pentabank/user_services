import Client from "../models/Client"
import mongoose from "mongoose"
import { getError, Message, } from "../utils/message";
import { ClientCreationInput } from "../GraphQLTypes/types";
import { validate } from "../utils/validator";

export async function addClient(client: ClientCreationInput): Promise<Message> {
    let _client = new Client(client);

    try {
        validate(client)
        let objectExist = await Client.findOne({ email: client.email }).exec()
        if (objectExist) {
            throw Error("Client already created")
        }
        await _client.save()
        return { code: 200, message: "Client inserted" }
    } catch (err) {
        let errors = getError(err)
        return { code: 400, message: "An error occured while trying to insert a new client. See error(s) below", errors: errors }
    }
}