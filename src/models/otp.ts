import mongoose, { Document, Model } from "mongoose"

interface IOtp extends Document {
    userId: String,
    token: String
}

let otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    token: String
})
otpSchema.set("timestamps", true)

const Otp: Model<IOtp> = mongoose.model("OTPCode", otpSchema)
export default Otp

