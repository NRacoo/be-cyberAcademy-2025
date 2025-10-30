const { UploadModule, UploadTask } = require("./admin.repository")


const HandlerUploadModule = async(
    name, 
    fileUrl,
    topik,
    status,
    description,
    imageUrl,
    available_at,
    is_clicked
) => {
    const module = await UploadModule(name, fileUrl, topik, status, description, imageUrl, available_at, is_clicked);
    return module
}

const HandlerUploadTask = async (title, description, fileUrl, deadline, modul_id) => {
    const task = await UploadTask(title, description, fileUrl, deadline, modul_id);
    return task
}

module.exports = 
{
    HandlerUploadModule,
    HandlerUploadTask
}