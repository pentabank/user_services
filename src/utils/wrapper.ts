import { GraphQLError } from "graphql";
import _ from "lodash/fp";
import jwt from "jsonwebtoken"

const SECRET: string = process.env.APP_SECRET || ""

const verifyToken = (context: any) => {
    let authHeader = context.headers.authorization;
    if (authHeader) {
        try {
            return jwt.verify(authHeader, SECRET)
        } catch (error) {
            throw error
        }
    }
}

export const isAuthorized = (fn: Function) => async (obj: any, args: any, context: any, info: any) => {
    try {
        verifyToken(context)
        return await fn(obj, args, context, info);
    } catch (error) {
        throw error
    }
}

export const checkAccesLevel = async (context: any) => {
    try {
        let decoded: any = verifyToken(context)
        const { accessLevel } = decoded
        if (!accessLevel || accessLevel === 0) throw new GraphQLError("Access denied to this operation")
        return true
    } catch (error) {
        throw error
    }
};

export function wrap(object: any, fn: any): any {
    let wrapped: Object = {}
    Object.entries(object).forEach(([key, value]) => {
        wrapped = {
            ...wrapped,
            [key]: _.compose(fn)(value),
        };
    });
    return wrapped
}