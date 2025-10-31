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

const GetTaskByTopik = async(topik) => {
    console.log("Topik: ", topik)
    const result = await prisma.task.findMany(
        {
            where:{topik: topik}
        }
    )
    console.log("result" , result)
    return result
}

module.exports = 
{
    GetAllTask,
    GetTaskById,
    GetTaskByTopik
}