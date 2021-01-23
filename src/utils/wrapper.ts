import { GraphQLError } from "graphql";
import _ from "lodash/fp";
import jwt from "jsonwebtoken"

const SECRET: string = process.env.APP_SECRET || ""

export const isAuthorized = (fn: Function) => async (obj: any, args: any, context: any, info: any) => {
    let authHeader = context.headers.authorization;
    if (authHeader) {
        try {
            jwt.verify(authHeader, SECRET)
            return await fn(obj, args, context, info);
        } catch (error) {
            throw error
        }
    }
    throw new GraphQLError("Unauthorized : no access token supplied");
};

export const checkAccesLevel = async (context: any) => {
    let authHeader = context.headers.authorization;
    if (authHeader) {
        try {
            let decoded: any = jwt.verify(authHeader, SECRET)
            const { accessLevel } = decoded
            if (!accessLevel || accessLevel === 0) throw new GraphQLError("Access denied to this operation")
            return true
        } catch (error) {
            throw error
        }
    }
    throw new GraphQLError("Unauthorized : no access token supplied");
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