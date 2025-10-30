const express = require('express');
const HandleGetModuleByUser = require('./module.service');
const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
    
        const result = await HandleGetModuleByUser(id);
        if(!result) {
            throw new Error("gagal mendapatkan module");
        };
    
        res.status(200).json({status:true, message:"berhasil mendapatkan modul", data:result})
        
    } catch (error) {
        console.error({message:"error di getmodul", error:error})
        res.status(500).json({status:false, message:"internal server error"})
    }
});

module.exports = router;