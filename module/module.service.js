const { GetModuleByUser, GetModuleByTopik } = require("./module.repository")


const HandleGetModuleByUser = async (id) => {
    const result = await GetModuleByUser(id)

    return result
}

const HandleGetModuleByTopik = async (topik) => {
    const result = await GetModuleByTopik(topik);
    if(!result) throw new Error("topik tidak ditemukan");
    return result
}

module.exports = 
{
    HandleGetModuleByUser,
    HandleGetModuleByTopik
}