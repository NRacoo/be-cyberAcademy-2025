
const prisma = require('../../config/prisma')

const RegisterUser= async(
    name,
    nim,
    className,
    email,
    noHp,
    gender,
    faculty,
    year,
    major,
    hashedPassword,
    document
)=>{
    const result = await prisma.user.create({
        data:{
            name:name,
            nim:nim,
            className:className,
            email:email,
            noHp:noHp,
            gender:gender,
            faculty:faculty,
            year:year,
            major:major,
            password:hashedPassword,
            document:document,
        }
    });
    return result;
}

 const GetUserByNim = async(nim)=>{
    const result = await prisma.user.findUnique({
        where:{nim}
    })
    return result
}

 const GetUserById = async (id) => {
    const result = await prisma.user.findUnique({
        where:{
            id
        }
    })
    return result;
}

 const GetUserByEmail = async (email) =>{
    const result = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return result
}

 const GetAdmin = async (username) =>{
    const result = await prisma.admin.findUnique({
        where:{username}
    })
    return result
}

module.exports = {
    RegisterUser,
    GetUserByEmail,
    GetUserById,
    GetUserByNim,
    GetAdmin,
}