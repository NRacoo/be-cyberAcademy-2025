const express = require('express');
const { HandleCreateSubmission } = require('./submission.service');
const router = express.Router()

router.post("/upload-submission", async(req, res) => {
    try {
        const {file, taskId} = req.body;

        const newSubmission = await HandleCreateSubmission(file, taskId);

        if(!newSubmission) throw new Error("submission gagal");
        
        res.status(201).json({status:true, message:"submission berhasil"})

    } catch (error) {
        console.error({message:"error di upload submission", error:error})
        res.status(500).json({status:false, message:"internal server error"})
    }
});



module.exports = router;