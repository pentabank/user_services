import mongoose from "mongoose"
import User from "./User"


let Employee = User.discriminator('Employee', new mongoose.Schema({
    matricule: { type: String, required: true },
    roles: [{ type: mongoose.Types.ObjectId, ref: "Role" }]
}))

export default mongoose.model("Employee")