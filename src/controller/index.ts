
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User"

const SECRET = process.env.APP_SECRET

export async function login(login: string, password: string) {


}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}