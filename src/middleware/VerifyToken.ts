import express from "express"
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken"

export default function authenticateJWt(req: express.Request, res: express.Response, next: Function) {

    const authHeader = req.headers.authorization;
    console.log(req.url)
    next()
    if (authHeader) {
        console.log(authHeader)
        next()
    } else {
        throw new GraphQLError('Unauthorized')
    }
}