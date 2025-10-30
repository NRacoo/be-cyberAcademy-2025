const express = require('express');
const { RegisterUserService, LoginUser, LoginAdmin, CountUser } = require('./service');
const router = express.Router();

router.post("/register", async(req, res) =>{
    try {
        const {
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
            document
        } = req.body

        const RegistredUser = await CountUser(topik);

        if(RegistredUser) {
            res.status(400).json({status:false, message:"pendaftar telah melebihi batas"})
        }
    
        const data = await RegisterUserService(  
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
            document);
    
        if(!data){
            throw new Error("data was not valid");
            
        }

        res.status(201).json({message:"status berhasil", data:data})
        
    } catch (error) {   
        console.error({message:"error di register", error:error})
        res.status(500).json({message:"internal server error", error:error})
    }
});

router.post("/login", async (req, res) => {
    try {
        const {nim, password} = req.body;
    
        const user = await LoginUser(nim, password);
        if(!user){
            throw new Error("nim atau password tidak valid");
        }
        
        res.status(201).json({status:true, message:"status berhasil", data:user});
        
    } catch (error) {
        console.error({message:"error pada login", error:error})
        res.status(500).json({message:"internal server error", error:error})
    }
});

router.post("/admin/login", async(req, res) => {
    try {
        const {username, password} = req.body;
    
        const loginAdmin = await LoginAdmin(username, password)
        res.status(201).json({status:true, message:"login berhasil", data:loginAdmin})
    } catch (error) {
        console.error("error di login admin", error);
        res.status(500).json({status:false, message:error})        
    }
})

module.exports = router