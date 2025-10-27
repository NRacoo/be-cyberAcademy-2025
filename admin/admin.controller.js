const express = require('express');
const upload = require('../config/multer');
const supabase = require('../config/supabase');
const { HandlerUploadModule } = require('./admin.service');
const router = express.Router();

router.post("/upload-module", upload.single("image"), async(req, res) => {
    try {
        const 
        {
             name, 
            fileUrl,
            user_id,
            status,
            description,
            available_at,
            is_clicked
        } = req.body

        let image = null;
        if(req.file) {
            const fileName = `${new Date.now()}--${req.file.originalname}`;
            const {data, error} = await supabase.storage
            .from("modul")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert:true
            });

            if(error) 
            {
                throw error
            }
            const {data: publicUrlData} = await supabase.storage
            .from("modul")
            .getPublicUrl(fileName)

            image = publicUrlData.publicUrl;

        };

        const data = await HandlerUploadModule( name, 
            fileUrl,
            user_id,
            status,
            description,
            image,
            available_at,
            is_clicked)
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
})


module.exports = router