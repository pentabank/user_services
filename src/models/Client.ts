import mongoose from "mongoose"
import User from "./User"


let Client = User.discriminator('Client', new mongoose.Schema({
    account: [{ type: mongoose.Types.ObjectId, ref: "Account" }],
    servicesSubscribedTo: [{ type: mongoose.Types.ObjectId }]
}))

export default Client