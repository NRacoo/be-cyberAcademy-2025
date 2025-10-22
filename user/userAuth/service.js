import { GetAdmin, getUserByEmail, getUserByNim } from './auth';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export const RegisterUser = async (
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
    const user = await RegisterUser(
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

export const LoginUser = async (nim, password) =>{
    if (!nim || !password){
        throw new Error("NIM dan Password harus diisi");
        
    }

    const user = await getUserByNim(nim);
    if(!user){
        throw new Error("user tidak ditemukan");
        
    }

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("password tidak valid");
    }

    const payload = {id : user.id, name: user.name, role: user.role}

    const token = jwt.sign(payload, process.JWTTOKEN, {expiresIn:'7d'});

    return{
        status: true,
        message:"login berhasil",
        payload,
        token: token,
    }
}

export const LoginAdmin = async (username, password) =>{
    const result = await GetAdmin(username)
    if(!result){
        throw new Error("username admin salah");
    };

    const isMatch = bcrypt.compare(password, result.password)
    if(!isMatch){
        throw new Error("password tidak valid");
    };

    const payload =
     {
        id:result.id,
        name:result.username,
        role:result.role,
    };

    const token = jwt.sign(payload, process.env.JWTTOKEN)

    return{
        status:true,
        message:"Login berhasil",
        payload,
        token:token,
    }
}