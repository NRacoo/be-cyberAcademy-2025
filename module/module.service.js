const { GetModuleByUser } = require("./module.repository")


const HandleGetModuleByUser = async (id) => {
    const result = await GetModuleByUser(id)

    return result
}

module.exports = HandleGetModuleByUser;