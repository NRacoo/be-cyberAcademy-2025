const express = require('express');
const router = express.Router()
const AuthRoutes = require('../../user/userAuth/controller')
const ServiceRoutes = require('../../user/user.controller')
const validationUser = require('../../middlewares/userAuth.middleware')

router.use("/auth", AuthRoutes);
router.use("/service", validationUser, ServiceRoutes)

module.exports = router;