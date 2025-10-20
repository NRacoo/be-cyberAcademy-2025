import { getUserByEmail, getUserByNim } from './auth';

const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt')


export const registerUser = async (
    name, 
    nim, 
    className, 
    email,
    noHp,
    gender,
    faculty,
    year,
    major,
    document,
) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!regexEmail.test(email)){
        throw new Error("Format email tidak sesuai");
    }

    const existUserByNim = await getUserByNim(nim)
    if(existUserByNim){
        throw new Error("NIM sudah terdaftar");
    }

    const existUserByEmail = await getUserByEmail(email);
    if(existUserByEmail){
        throw new Error("email sudah terdaftar");
    }

    const hashedPassword = bcrypt.hash(nim, 10)
    const user = await registerUser(
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
    )
    return user;
}