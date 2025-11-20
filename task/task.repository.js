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
        })
        const mapped = await Promise.all(
        result.map(async (task) => {
        const submission = await prisma.submissions.findFirst({
            where: {
                task_id: task.id,
                user_id: userId
            }
        })

        return {
            id: task.id,
            title: task.title,
            description: task.description,
            file: task.file,
            deadline: task.deadline,
            topik: task.topik,
            isSubmitted: !!submission,
            submissionsFile: submission?.file ?? null,
            submissionsStatus: submission?.status ?? null,
        }
        })
    )

    console.log("result" , mapped)
    return mapped
}

module.exports = 
{
    GetAllTask,
    GetTaskById,
    GetTaskByTopik
}