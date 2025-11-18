const { CreateSubmission, DeleteSubmission } = require("./submission.repository")

const HandleCreateSubmission = async(file, taskId, userId) => {
    const result = CreateSubmission(file, taskId, userId)
    return result
}

const HandleDeleteSubmission = async (id) => {
    return await DeleteSubmission(id)
}

module.exports = 
{
    HandleCreateSubmission, 
    HandleDeleteSubmission
}