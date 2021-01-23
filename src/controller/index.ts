import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { addClient, findClientByIdOrEmail, updateClient } from "./Client/Client"
import otpModel from "../models/otp"

let otpGenerator = require('otp-generator')

const SECRET: string = process.env.APP_SECRET || "Pentabank"
const OTP_EXP: number = 600000

export const TOKEN_EXP_TIME: number = 18000000

export async function login(parent: any, args: any) {

    const clientModel = mongoose.model("Client")
    let user: any = await clientModel.findOne({ $and: [{ email: args.email }, { isActive: true }] }).lean()

    if (!user) {
        throw new Error("No such user found or account not actived")
    }
    const valid = await bcrypt.compare(args.password, user.password)

    if (!valid) {
        throw new Error("Invalid password")
    }
    let { password, ...rest } = user
    const token = jwt.sign({ user: rest, accessLevel: 0, exp: new Date().getTime() + TOKEN_EXP_TIME }, SECRET)
    return token

}

export async function signup(parent: any, args: any) {

    let user: any = await addClient(null, args, null)
    let otp = await generateToken()

    let res = await otpModel.create({
        userId: user._id,
        token: otp.toUpperCase()
    })
    return otp.toUpperCase()

}

export async function activeAccount(parent: any, args: any) {
    const { email, otpCode } = args
    const clientModel = mongoose.model("Client")

    let client: any = await clientModel.findOne({ $and: [{ email: email }, { isActive: true }] })
    if (client) {
        throw new Error("Account already activated")
    }
    //active account
    let user = await findClientByIdOrEmail(null, { email: email }, null)
    let _user = { ...user, isActive: true }

    let res: any = await otpModel.findOne({ userId: user._id, token: otpCode }).sort({ createdAt: -1 }).exec()
    let created = new Date(new Date(res.createdAt)).getTime()
    let current = new Date().getTime()

    if (created - current > OTP_EXP) {
        throw new Error("Token has expired")
    }

    await updateClient(null, { client: _user }, null)

    return true
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

export async function generateToken(size: number = 6) {
    return await otpGenerator.generate(size, { upperCase: false, specialChars: false });
}

export async function regenerateToken(parent: any, { email }: any, context: any) {
    let user: mongoose.Document = await findClientByIdOrEmail(null, { email: email }, null)
    if (!user) {
        throw new Error("No such user found")
    }
    let otp = await generateToken()

    let res = await otpModel.create({
        userId: user._id,
        token: otp.toUpperCase()
    })

    return {
        code: 200,
        content: "A new token has been generated",
        data: [otp.toUpperCase()]
    }
}
