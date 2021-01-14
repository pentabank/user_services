import { allClients, findClientByIdOrEmail } from "../../controller/Client/Client";
import { regenerateToken, login } from "../../controller";
import { GraphQLError } from "graphql";
import _ from "lodash/fp";
import jwt from "jsonwebtoken"

const SECRET: string = process.env.APP_SECRET || ""

const greeting = (obj: any, args: any, context: any, info: any) => {
    return "Hello GraphQL";
};

const isAuthorized = (fn: Function) => async (obj: any, args: any, context: any, info: any) => {
    let authHeader = context.headers.authorization;
    if (authHeader) {
        try {
            jwt.verify(authHeader, SECRET)
            return await fn(obj, args, context, info);
        } catch (error) {
            throw new GraphQLError("Unauthorized : invalid token signature");
        }
    }
    throw new GraphQLError("Unauthorized : no access token supplied");
};

let publicResolvers = {
    greeting,
    login,
    regenerateToken,
};

let privateResolvers = {
    allClients,
    findClientByIdOrEmail,
};

Object.entries(privateResolvers).forEach(([key, value]) => {
    privateResolvers = {
        ...privateResolvers,
        [key]: _.compose(isAuthorized)(value),
    };
});

let r = {
    ...publicResolvers,
    ...privateResolvers,
};

export default r;
