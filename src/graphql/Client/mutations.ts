import { addClient, updateClient, deleteClientById } from '../../controller/Client/Client'

import { signup, activeAccount } from "../../controller"
import { isAuthorized, wrap } from '../../utils/wrapper'



const publicMutations = {
    activeAccount,
    signup,
}
let privateMutations = {
    addClient,
    updateClient,
    deleteClientById,
}

privateMutations = wrap(privateMutations, isAuthorized)

const mutations = {
    ...publicMutations, ...privateMutations
}
export default mutations