const express = require('express');
const { GetTaskById, GetTaskByTopik } = require('./task.repository');
const router = express.Router()

router.get("/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const task = await GetTaskById(id);

        res.status(200).json({status:true, message:"task berhasil didapat", data:task})

    } catch (error) {
        
    }
});

router.get("/by-topik/:topik", async(req, res) => {
    try {
        const {topik} = req.query
       
        const task = await GetTaskByTopik(topik)
        res.status(200).json({status:true, message:"task berhasil didapat", data:task})
    } catch (error) {
        console.error("message: ", error);
        res.status(500).json({status:false, message:"internal server error", error:error})
    }
})

module.exports = router;