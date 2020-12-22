import mongoose, { Model } from "mongoose"


interface IUser extends mongoose.Document {
    email: String,
    password: String,
    firstName: String
    lastName: String,
    dateOfBirth: Date,
    CIN: String,
    address: String,
    phoneNumber: String,
    isActive: Boolean,
    age: Number,
}

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
    isActive: { type: Boolean, default: false },
    age: { type: Number, min: 18, max: 60, required: true },
},
)
userSchema.set(' discriminatorKey', 'type')
userSchema.set('timestamps', true)

const User: Model<IUser> = mongoose.model('User', userSchema)

export default User