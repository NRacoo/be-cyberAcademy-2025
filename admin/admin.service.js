const { UploadModule, UploadTask } = require("./admin.repository")


const HandlerUploadModule = async(
    name, 
    fileUrl,
    user_id,
    status,
    description,
    image,
    available_at,
    is_clicked
) => {
    const module = await UploadModule(name, fileUrl, user_id, status, description, image, available_at, is_clicked);
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