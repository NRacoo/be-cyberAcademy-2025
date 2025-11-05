const prisma = require('../config/prisma');
const { GetUserById } = require('../user/userAuth/auth');

const GetModul = async(title) => {
    const result = await prisma.modul.findFirst({
        where:{name: title}
    })
    return result
}

const UpdateModul = async(id) => {
    const result = await prisma.modul.findFirst({
        where:{id}
    });
    return result
}

const GetModuleByUser = async (id) => {
    const result = await prisma.user.findUnique({
        where:{id},
        select:{topik: true},
    })
    if(!result){
        throw new Error("User tidak ditemukan");
        
    }
    const module = await prisma.modul.findMany({
        where:{topik:result.topik}
    })
    return module;

}

const GetModuleByTopik = async(topik) =>{
    const result = await prisma.modul.findMany(
        {
            where:{topik},
            include: {user:true}
        }
    )
    return result
}

module.exports = 
{
    GetModul,
    GetModuleByUser,
    UpdateModul,
    GetModuleByTopik
}