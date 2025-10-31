const { CreateSubmission, DeleteSubmission } = require("./submission.repository")

const HandleCreateSubmission = async(file, taskId) => {
    const result = CreateSubmission(file, taskId)
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