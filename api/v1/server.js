const express = require('express');
const router = express.Router()
const AuthRoutes = require('../../user/userAuth/controller')
const ServiceRoutes = require('../../user/user.controller')
const AdminRoutes = require('../../admin/admin.controller')
const validationUser = require('../../middlewares/userAuth.middleware')
const validationAdmin = require('../../middlewares/auth.middleware')

router.use("/auth", AuthRoutes);
router.use("/service", validationUser, ServiceRoutes)
router.use("/admin", validationAdmin, AdminRoutes)
module.exports = router;