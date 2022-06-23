const express = require('express')
const userRoute = require('./usersRoutes')
const vehicleRoute = require('./vehicleRoutes')
const router = express.Router()

router.use(userRoute)
router.use(vehicleRoute)

module.exports = router
