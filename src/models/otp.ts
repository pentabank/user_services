import mongoose from "mongoose"


let otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    token: String
})
otpSchema.set("timestamps", true)

export default mongoose.model("OTPCode", otpSchema)

