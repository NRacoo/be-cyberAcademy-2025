const prisma = require('../config/prisma')

const getUserById = async()=>{
    const user = await prisma.user.findUnique(
        {
            where:{id:id}
        }
    )
    return user;
}

const UpdateUserByEmail = async (email, user)=>{
    const result = await prisma.user.update({
        where:{email},
        data:user
    });
    return result;
} 

const UpdateUserById = async(id, user) => {
    const result = await prisma.user.update({
        where:{id},
        data:user
    });
    return result;
}

module.exports =
{
    getUserById,
    UpdateUserByEmail,
    UpdateUserById
}