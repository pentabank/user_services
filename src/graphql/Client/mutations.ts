import { addClient, updateClient, deleteClientById } from '../../controller/Client/Client'

import { signup, activeAccount } from "../../controller"
const mutations = {
    addClient,
    updateClient,
    deleteClientById,
    activeAccount,
    signup,
}

export default mutations