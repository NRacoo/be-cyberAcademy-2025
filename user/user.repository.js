const prisma = require('../config/prisma')

export const getUser = async()=>{
    const user = await prisma.user.findMany()
    return user;
}

export const UpdateUserByEmail = async (email, user)=>{
    const result = await prisma.user.update({
        where:{email},
        data:user
    });
    return result;
} 

export const UpdateUserById = async(id, user) => {
    const result = await prisma.user.update({
        where:{id},
        data:user
    });
    return result;
}