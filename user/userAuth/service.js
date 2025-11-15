const   { GetAdmin, GetUserByEmail, GetUserByNim, RegisterUser, Count } = require('./auth');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

 const RegisterUserService = async (
    name, 
    nim, 
    className, 
    email,
    noHp,
    gender,
    faculty,
    year,
    major,
    topik,
    document,
) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!regexEmail.test(email)){
        throw new Error("Format email tidak sesuai");
    }

    const existUserByNim = await GetUserByNim(nim)
    if(existUserByNim){
        throw new Error("NIM sudah terdaftar");
    }

    const existUserByEmail = await GetUserByEmail(email);
    if(existUserByEmail){
        throw new Error("email sudah terdaftar");
    }

    const result = await Count(topik);
    const MAX = 26
    
    if(result >= MAX){
        throw new Error(`Pendaftaran untuk topik ${topik} sudah penuh`);
        
    }

    const hashedPassword = await bcrypt.hash(nim, 10)
    console.log("debug hash", hashedPassword, typeof hashedPassword)
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
        topik,
        hashedPassword,
        document
    )
    return user;
}

 const LoginUser = async (nim, password) =>{
    if (!nim || !password){
        throw new Error("NIM dan Password harus diisi");
        
    }

    const user = await GetUserByNim(nim);
    if(!user){
        throw new Error("user tidak ditemukan");
        
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("password tidak valid");
    }

    const payload = {id : user.id, name: user.name, role: user.role}

    const token = jwt.sign(payload, process.env.JWTTOKEN, {expiresIn:'7d'});

    return{
        payload,
        token: token,
    }
};

const LoginAdmin = async (username, password) =>{
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
        payload,
        token:token,
    }
}

module.exports = 
{
    RegisterUserService,
    LoginUser,
    LoginAdmin,
}
