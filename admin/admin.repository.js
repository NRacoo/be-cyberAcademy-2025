const prisma = require('../config/prisma');

const UploadModule = async(
    name, 
    fileUrl,
    topik,
    status,
    description,
    imageUrl,
    available_at,
    is_clicked
) => {
    const result = await prisma.modul.create({
        data:{
            name:name,
            link:fileUrl,
            topik:topik,
            status:status,
            description:description,
            image:imageUrl,
            available_at:new Date(available_at).toISOString(),
            is_clicked:is_clicked,
        }
    });
    return result
};

const UploadTask = async (title, description, fileUrl, topik, deadline, modul_id) => {
   console.log(deadline)
    const result = await prisma.task.create(
        {
            data:
            {
                title:title,
                description:description,
                file:fileUrl,
                deadline: new Date(deadline).toISOString(),
                topik: topik,
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