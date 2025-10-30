const express = require('express');
const upload = require('../config/multer');
const { HandlerUploadModule } = require('./admin.service');
const router = express.Router();

router.post("/upload-module", async(req, res) => {
    try {
        const 
        {
            name, 
            fileUrl,
            topik,
            status,
            description,
            imageUrl,
            available_at,
            is_clicked
        } = req.body

          const parsedData = {
            name,
            fileUrl,
            topik,
            status,
            description,
            imageUrl,
            available_at: available_at ? new Date(available_at) : null, 
            is_clicked:
                typeof is_clicked === "boolean"
                ? is_clicked
                : is_clicked === "true" 
        };

        

        const data = await HandlerUploadModule( 
            parsedData.name, 
            parsedData.fileUrl,
            parsedData.topik,
            parsedData.status,
            parsedData.description,
            parsedData.imageUrl,
            parsedData.available_at,
            parsedData.is_clicked)
        res.status(201).json(
            {
                status:true,
                message:"Upload Modul Berhasil",
                data: data
            }
        )
    } catch (error) {
        console.error("Error di upload modul", error)
        res.status(500).json({message:"internal server error", error:error})
    }
});

router.post("/upload-task", async(req, res) => {
    const {title, description, fileUrl, deadline, modul_id} = req.body;

    const data = await HandlerUploadTask(title, description, fileUrl, deadline, modul_id);

    res.status(201).json(
        {
            status:true, 
            message:"upload tugas berhasil",
            data:data
        }
    )
});


module.exports = router