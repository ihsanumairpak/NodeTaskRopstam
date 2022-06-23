const sequelize = require('sequelize')
const Op = sequelize.Op
const vehicleModel = require('../../models/vehicle')

const Allvehicle = async (req, res) => {
  try {
    const vehicle = await vehicleModel.findAll({
      where: {
        isDelete: 0,
      },
    })
    res.render('admin/vehicle', {
      vehicle: vehicle,
      successFlash: req.flash('success'),
      errorFlash: req.flash('error'),
    })
  } catch (error) {
    console.log(error.message)
  }
}

const addVehicle_get = async (req, res) => {
  try {
    res.render('admin/add-vehicle', {
      successFlash: req.flash('success'),
      errorFlash: req.flash('error'),
    })
  } catch (error) {
    console.log(error.message)
  }
}

const addvehicle = async (req, res) => {
  try {
    let { name_en, category, color, Model } = req.body

    if (!name_en || !category || !color || !Model) {
      req.flash('error', 'please fill all the field')
      return res.redirect('addvehicle')
    }
    await vehicleModel
      .create({
        name_en,
        category,
        color,
        Model,
      })
      .then((data) => {
        console.log(data)
        req.flash('success', 'Vehicle added Sucessfully')
        return res.redirect('/admin/vehicle')
      })
      .catch((err) => {
        return req.flash('error', err.message)
      })
  } catch (error) {
    return req.flash('error', error.message)
  }
}

const deleteVehicle = async (req, res) => {
  try {
    vehicleModel
      .update(
        {
          isDelete: 1,
          updatedAt: new Date(),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((deleted) => {
        console.log(deleted)
        req.flash('success', 'Vehicle deleted Successfully')
        return res.redirect('/admin/vehicle')
      })
      .catch((error) => {
        req.flash('error', 'Please Check something is wrong', error.message)
        console.log(error.message)
        return res.redirect('/admin/vehicle')
      })
  } catch (error) {
    console.log(error.message)
  }
}

const updateVehicle_get = async (req, res) => {
  vehicleModel
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((Update) => {
      res.render('admin/update-vehicle', {
        success: true,
        message: 'find',
        data: Update,
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    })
    .catch((error) => {
      res.send(error)
    })
}

const updateVehicle_post = async (req, res) => {
  let { name_en, category, color, Model } = req.body
  vehicleModel
    .update(
      {
        name_en,
        category,
        color,
        Model,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((vehicle) => {
      req.flash('success', ' Vehicle Updated Successfully')
      return res.redirect('/admin/vehicle')
    })
    .catch((error) => {
      req.flash('error', 'Please Check something is wrong', error.message)
      console.log(error.message)
      return res.redirect('/admin/vehicle')
    })
}

module.exports = {
  Allvehicle,
  addVehicle_get,
  addvehicle,
  deleteVehicle,
  updateVehicle_get,
  updateVehicle_post,
}
