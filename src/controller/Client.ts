import { getConnection } from "../models/db"
import Client from "../models/Client"
import { getError, Message, } from "../utils/message";

const db = getConnection()

export async function addClient(client: any): Promise<Message> {
    let _client = new Client(client);
    //check if client doesnt exist already
    Client.findOne({ email: _client.schema.get("email") })
    try {
        let res = await _client.save()
        return { code: 200, message: "Client inserted" }
    } catch (err) {
        let errors = getError(err)
        return { code: 400, message: "An error occured while trying to insert a new client. See error(s) below", errors: errors }
    }
}