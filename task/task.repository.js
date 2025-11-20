const prisma = require("../config/prisma")
const { Topik } = require("../generated/prisma")

const GetAllTask = async() => {
    const result = await prisma.task.findMany()
    return result
}

const GetTaskById = async(taskId) => {
    const result = await prisma.task.findUnique({
        where:{id:taskId},
        select: {topik: true}
    })
    return result
}

const GetTaskByTopik = async(topik, userId) => {
    console.log("Topik: ", topik)
    const result = await prisma.task.findMany(
        {
            where:{topik: topik},
            include:{
                submissions:{
                    where:{user_id : userId},
                    select:{
                        id:true,
                        file:true,
                        status:true,
                        submitted_at:true
                    }
                }
            }
        })
        const mapped = result.map(task => ({
            id:task.id,
            title:task.title,
            description:task.description,
            file:task.file,
            deadline:task.deadline,
            topik:task.topik,
            isSubmitted:task.submissions.length > 0,
            submissionsFile:task.submissions[0]?.file ?? null,
            submissionsStatus:task.submissions[0]?.status ?? null
        }))
    console.log("result" , mapped)
    return mapped
}

module.exports = 
{
    GetAllTask,
    GetTaskById,
    GetTaskByTopik
}