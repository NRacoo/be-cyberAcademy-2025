const express = require('express');
const route = express.Router();
const v1Routes = require('./v1/server')

route.use("/v1", v1Routes)

module.exports = route