import mongoose from "mongoose"


const options = {
    discriminatorKey: 'type',
}

let userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    CIN: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 12 },
    createdAt: { type: Date, default: Date.now(), required: true },
    isActive: { type: Boolean, default: false },
    age: { type: Number, min: 18, max: 60, required: true },

})
userSchema.set(' discriminatorKey', 'type')

export default mongoose.model('User', userSchema)