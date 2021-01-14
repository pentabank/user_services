import { allClients, findClientByIdOrEmail } from "../../controller/Client/Client";
import { regenerateToken, login } from "../../controller";
import { wrap } from "../utils";
import _ from "lodash/fp";


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

privateResolvers = wrap(privateResolvers)

let r = {
    ...publicResolvers,
    ...privateResolvers,
};

export default r;
