import { UpdateUserByEmail, UpdateUserById } from './user.repository';
import { getUserByEmail, getUserById } from './userAuth/auth';

const bcrypt = require('bcrypt');


export const changePassword = async (id, oldPassword, newPassword) =>{
    const user = await getUserById(id);
    if(!user){
        throw new Error("user tidak ditemukan");
    }

    const isPasswordMarch = await bcrypt(oldPassword, user.password)
    if(!isPasswordMarch){
        throw new Error("password tidak valid");
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updateUser = await UpdateUserById(id, {password: hashedPassword});

    delete updateUser.password
    return updateUser;
}

export const resetPassword = async (email, password, confirmPassword) => {
    const user = await getUserByEmail(email);
    if(!user){
        throw new Error("user tidak ditemukan");
        
    }

    if(!password || !confirmPassword){
        throw new Error("password tidak boleh kosong");
        
    }

    if(password !== confirmPassword){
        throw new Error("password tidak sama")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const UpdateUserPassword = await UpdateUserByEmail(email, {password: hashedPassword});

    delete UpdateUserPassword.password
    return UpdateUserPassword
    
}