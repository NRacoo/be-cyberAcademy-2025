const prisma = require('../config/prisma');

const UploadModule = async(
    name, 
    fileUrl,
    user_id,
    status,
    description,
    image,
    available_at,
    is_clicked
) => {
    const result = await prisma.modul.create({
        data:{
            name:name,
            link:fileUrl,
            user:{connect:{id:user_id}},
            status:status,
            description:description,
            image:image,
            available_at:new Date(available_at).toISOString(),
            is_clicked:is_clicked,
        }
    });
    return result
};

const UploadTask = async (title, description, fileUrl, deadline, modul_id) => {
    const result = await prisma.task.create(
        {
            data:
            {
                title:title,
                description:description,
                file:fileUrl,
                deadline: new Date(deadline).toISOString(),
                modul:{connect:{id:modul_id}},
            }
        }
    )
    return result
}

module.exports =
{
    UploadTask,
    UploadModule
}