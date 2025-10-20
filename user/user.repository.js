const prisma = require('../config/prisma')

export const getUser = async()=>{
    const user = await prisma.user.findMany()
    return user;
}

