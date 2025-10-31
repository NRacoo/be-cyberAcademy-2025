const express = require('express');
const router = express.Router()
const AuthRoutes = require('../../user/userAuth/controller')
const ServiceRoutes = require('../../user/user.controller')
const AdminRoutes = require('../../admin/admin.controller')
const ModulRoutes = require('../../module/module.controller')
const SubmissionRoutes = require('../../submissions/submission.controller')
const TaskRoutes = require('../../task/task.controller')
const validationUser = require('../../middlewares/userAuth.middleware')
const validationAdmin = require('../../middlewares/auth.middleware')

router.use("/auth", AuthRoutes);
router.use("/service", validationUser, ServiceRoutes)
router.use("/admin", validationAdmin, AdminRoutes)
router.use("/modul", validationUser, ModulRoutes)
router.use("/submission", validationUser, SubmissionRoutes)
router.use("/task", validationUser, TaskRoutes)
module.exports = router;