const express = require('express');
const route = express.Router();
const userService = require("./user.service");
const { GetUserByEmail } = require('./userAuth/auth');


route.patch("/change-password", async(req, res) => {
    try {
        const id = req.user.id;
        const {oldPassword, newPassword} = req.body;

        if(!id){
            throw new Error("id tidak valid!");
        }

        if(!oldPassword || !newPassword){
            throw new Error("kolom tidak boleh kosong");
        }

        const updateUser = await userService.changePassword(id, oldPassword, newPassword);
        
        if(!updateUser){
            throw new Error("User tidak valid");
            
        }
        return res.status(201).json({
            status:true,
            message:"Password berhasil diubah",
            data:updateUser,
        })

        
    } catch (error) {
        res.status(403).json(
            {
                status:false,
                message:"password tidak valid",
                data:error
            }
        );
        console.error(error)
    }
})

route.post("/reset-password", async(req, res) => {
    try {
        const {email, password, confirmPassword} = req.body
    
        const userEmail = await GetUserByEmail(email) 
        if(!userEmail){
            throw new Error("user tidak ditemukan")
        }
        const updateUser = await userService.resetPassword(email, password, confirmPassword);
        if(!updateUser){
            throw new Error("salah satu data tidak valid");
            
        }
        res.status(201).json({
            status:true,
            message:"password berhasil diatur ulang"
        })
    } catch (error) {
        res.status(500).json({status:false, message:"internal server error", data:error})
        console.error(error)
    }
});

route.get("/whoami", async(req, res) => {
    try {
        const data = await userService.userId(req.user.id)
        res.status(200).json({
            status:true, message:"user ditemukan", data:data
        })
    } catch (error) {
         res.status(500).json({status:false, message:"internal server error", data:error})
        console.error(error)
    }
})


module.exports = route