const express = require('express')
const router = express.Router()
const models = require('../../models/users')
const {
  addUser,
  dashboard,
  Allusers,
  login,
  addUser_get,
  deleteUser,
  updateUser_get,
  updateUser_post,
  signup,
  userLogin_post,
  updatePassword_get,
  updatePassword_post,
  logout,
  signup_get,
} = require('../../controller/admin/usersController')

const {
  isLoggedIn,
  isAlreadyLogin,
} = require('../../middleware/sessionmiddleware')

//User Register
router.route('/admin/users').get(Allusers)
router.route('/admin/adduser').get(addUser_get)
router.route('/admin/add-user').post(addUser)
router.route('/admin/deleteuser/:id').get(deleteUser)
router.route('/admin/updateuser/:id').get(updateUser_get)
router.route('/admin/update-user/:id').post(updateUser_post)
router.route('/admin/updatepassword/:id').get(updatePassword_get)
router.route('/admin/update-password/:id').post(updatePassword_post)
router.get('/signup', signup_get)
router.post('/signupform', signup)
router.route('/admin/login_post').post(userLogin_post)

router.get('/dashboard', dashboard)

router.route('/login').get(login)
router.route('/logout').get(logout)

module.exports = router
