import express from "express"
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"


const SECRET: string = process.env.APP_SECRET || "Pentabank"

export default function authenticateJWt(req: express.Request, res: express.Response, next: Function) {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        try {
            jwt.verify(authHeader, SECRET)
            next()
        } catch (error) {
            res.status(403).send(error)
        }
    } else {
        throw new GraphQLError('Unauthorized')
    }
}