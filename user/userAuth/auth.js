import e from 'express';

const prisma = require('../../config/prisma')

export const registerUser = async(
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

export const getUserByNim = async(nim)=>{
    const result = await prisma.user.findUnique({
        where:{nim}
    })
    return result
}

export const getUserById = async (id) => {
    const result = await prisma.user.findUnique({
        where:{
            id
        }
    })
    return result;
}

export const getUserByEmail = async (email) =>{
    const result = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return result
}

export const GetAdmin = async (username) =>{
    const result = await prisma.admin.findUnique({
        where:{username}
    })
    return result
}