const express = require('express')
const router = express.Router()
const models = require('../../models/vehicle')
const {
  Allvehicle,
  addVehicle_get,
  addvehicle,
  deleteVehicle,
  updateVehicle_get,
  updateVehicle_post,
} = require('../../controller/admin/vehicleController')

//User Register
router.route('/admin/vehicle').get(Allvehicle)
router.route('/admin/addvehicle').get(addVehicle_get)
router.post('/admin/add-vehicle', addvehicle)
router.route('/admin/deletevehicle/:id').get(deleteVehicle)
router.route('/admin/updatevehicle/:id').get(updateVehicle_get)
router.route('/admin/update-vehicle/:id').post(updateVehicle_post)

module.exports = router
