import { addClient, updateClient, deleteClientById } from '../../controller/Client/Client'

import { signup, activeAccount } from "../../controller"
import { wrap } from '../utils'



const publicMutations = {
    activeAccount,
    signup,
}
let privateMutations = {
    addClient,
    updateClient,
    deleteClientById,
}

privateMutations = wrap(privateMutations)

const mutations = {
    ...publicMutations, ...privateMutations
}
export default mutations