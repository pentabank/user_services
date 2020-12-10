import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { addClient, findClientByIdOrEmail, updateClient } from "./Client/Client"
import otpModel from "../models/otp"
import { GraphQLError } from "graphql"

let otpGenerator = require('otp-generator')

const SECRET: string = process.env.APP_SECRET || "Pentabank"
const OTP_EXP: number = 600000

export const TOKEN_EXP_TIME: number = 18000000

export async function login(parent: any, { email, userPassword }: any) {

    const clientModel = mongoose.model("Client")
    let user: any = await clientModel.findOne({ $and: [{ email: email }, { isActive: true }] }).lean()

    if (!user) {
        throw new Error("No such user found or account not actived")
    }
    const valid = await bcrypt.compare(userPassword, user.password)

    if (!valid) {
        throw new Error("Invalid password")
    }
    const { password, ...rest } = user
    const token = jwt.sign({ user: rest, exp: new Date().getTime() + TOKEN_EXP_TIME }, SECRET)
    return token

}

export async function signup(parent: any, args: any) {

    let user: any = await addClient(null, args)
    let otp = await generateToken()

    let res = await otpModel.create({
        userId: user._id,
        token: otp.toUpperCase()
    })
    return otp.toUpperCase()


}

export async function activeAccount(parent: any, args: any) {
    const { id, otpCode } = args
    const clientModel = mongoose.model("Client")


    let check: any = await clientModel.findOne({ $and: [{ _id: id }, { isActive: true }] })
    if (check) {
        throw new Error("Account already activated")
    }

    let res: any = await otpModel.findOne({ userId: id, token: otpCode }).sort({ createdAt: -1 }).exec()
    let created = new Date(new Date(res.createdAt)).getTime()
    let current = new Date().getTime()

    if (created - current > OTP_EXP) {
        throw new Error("Token has expired")
    }

    //ActiveAccount
    let user = await findClientByIdOrEmail(null, { id: id })
    let _user = { ...user, isActive: true }
    await updateClient(null, { client: _user })

    return true
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

export async function generateToken(size: number = 6) {
    return await otpGenerator.generate(size, { upperCase: false, specialChars: false });
}

export async function regenerateToken(parent: any, { userId }: any) {
    let user = await findClientByIdOrEmail(null, { id: userId })
    if (!user) {
        throw new Error("No such user found")
    }
    let otp = await generateToken()
    let res = await otpModel.create({
        userId: userId,
        token: otp.toUpperCase()
    })

    return {
        code: 200,
        content: "A new token has been generated",
        data: [otp.toUpperCase()]
    }
}
