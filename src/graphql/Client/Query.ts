import { allClients, findClientByIdOrEmail } from "../../controller/Client/Client";
import { regenerateToken, login } from "../../controller";
import { isAuthorized } from "../../utils/wrapper";
import _ from "lodash/fp";

const SECRET: string = process.env.APP_SECRET || ""

const greeting = (obj: any, args: any, context: any, info: any) => {
    return "Hello GraphQL";
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
