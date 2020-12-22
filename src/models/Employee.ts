import mongoose, { Document } from "mongoose"
import User from "./User"

interface IEmploye extends Document {
    matricule: String,
    roles: Array<String>
}

let Employee = User.discriminator('Employee', new mongoose.Schema({
    matricule: { type: String, required: true },
    roles: [{ type: mongoose.Types.ObjectId, ref: "Role" }]
}))

export default Employee