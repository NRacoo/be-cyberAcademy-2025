const prisma = require("../config/prisma")
const { GetTaskById } = require("../task/task.repository")


const CreateSubmission = async(file, taskId, userId) => {
    const task = await GetTaskById(taskId)

    if(!task) throw new Error("task tidak ditemukan");
    

    const data = await prisma.submissions.create({
        data:{
            file:file,
            task:{ connect : {id : taskId} },
            topik: task.topik,
            user:{connect: {id: userId}}
        },
    })
    return data
}

const GetSubmissionByTopic = async(topik) => {
    return await prisma.submissions.findMany(
        {
            where:{
                topik: topik
            },
            include: {
                user:true
            }
        }
    )
}

const DeleteSubmission = async(id) => {
    return await prisma.submissions.delete(
        {
            where:{id: id}
        }
    )
}

module.exports = 
    {
        CreateSubmission,
        GetSubmissionByTopic,
        DeleteSubmission
    }