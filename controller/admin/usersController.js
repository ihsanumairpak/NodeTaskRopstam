const sequelize = require('sequelize')
const Op = sequelize.Op
const userModel = require('../../models/users')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const SendEmail = require('../../email')

const Allusers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        isDelete: 0,
      },
    })
    res.render('admin/users', {
      title: `Users`,
      users: users,
      successFlash: req.flash('success'),
      errorFlash: req.flash('error'),
    })
  } catch (error) {
    console.log(error.message)
  }
}

const addUser_get = async (req, res) => {
  try {
    res.render('admin/add-user', {
      successFlash: req.flash('success'),
      errorFlash: req.flash('error'),
    })
  } catch (error) {
    console.log(error.message)
  }
}

const addUser = async (req, res) => {
  try {
    const hashed_pass = bcrypt.hashSync(req.body.password, 10)

    let { name_en, email, type, password, cpassword, contact, address } =
      req.body

    if (!name_en || !email || !password || !contact || !address || !type) {
      req.flash('error', 'please fill all the field')
      return res.redirect('adduser')
    }
    if (password != cpassword) {
      req.flash('error', 'Both Password Must Be Equal')
      return res.redirect('adduser')
    }

    const exist = await userModel.findOne({ where: { email: email } })
    if (exist) {
      req.flash('error', 'User with This Email already exists')
      return res.redirect('adduser')
    } else {
      userModel
        .create({
          name_en,
          email,
          password: hashed_pass,
          type,
          contact,
          address,
        })
        .then(() => {
          req.flash('success', 'User added Sucessfully')
          return res.redirect('/admin/users')
        })
        .catch((err) => {
          return req.flash('error', err.message)
        })
    }
  } catch (error) {
    return req.flash('error', error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    userModel
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
        req.flash('success', 'User deleted Successfully')
        return res.redirect('/admin/users')
      })
      .catch((error) => {
        req.flash('error', 'Please Check something is wrong', error.message)
        console.log(error.message)
        return res.redirect('/admin/users')
      })
  } catch (error) {
    console.log(error.message)
  }
}

const updateUser_get = async (req, res) => {
  userModel
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((userUpdate) => {
      res.render('admin/update-user', {
        success: true,
        message: 'find',
        data: userUpdate,
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    })
    .catch((error) => {
      res.send(error)
    })
}

const updateUser_post = async (req, res) => {
  let { name_en, email, contact, address } = req.body
  userModel
    .update(
      {
        name_en: name_en,
        email: email,
        contact: contact,
        address: address,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((userModel) => {
      console.log(userModel)
      req.flash('success', ' User Updated Successfully')
      return res.redirect('/admin/users')
    })
    .catch((error) => {
      req.flash('error', 'Please Check something is wrong', error.message)
      console.log(error.message)
      return res.redirect('/admin/users')
    })
}

const userLogin_post = async (req, res) => {
  try {
    let { email, password } = req.body
    const exist = await userModel.findOne({
      where: {
        email: email,
      },
    })
    if (exist) {
      const passMatch = await bcrypt.compare(password, exist.password)
      if (passMatch) {
        ;(req.session.auth = true), (req.session.user = exist)
        req.flash('success', 'You are successfully logged In...')
        res.redirect('/dashboard')
      } else {
        req.flash('error', ' password not valid')
        return res.redirect('/login')
      }
    } else {
      req.flash('error', ' Credentials Not Valid')
      return res.redirect('/login')
    }
  } catch (error) {
    req.flash('error', error.message)
    return res.send(error.message)
  }
}

const dashboard = async (req, res) => {
  res.render('admin/dashboard', {
    successFlash: '',
    errorFlash: '',
    successFlash: req.flash('success'),
    errorFlash: req.flash('error'),
  })
}

const login = async (req, res) => {
  res.render('admin/login', {
    successFlash: '',
    errorFlash: '',
    successFlash: req.flash('success'),
    errorFlash: req.flash('error'),
  })
}

const signup_get = (req, res) => {
  res.render('admin/signup', {
    successFlash: req.flash('success'),
    errorFlash: req.flash('error'),
  })
}

const signup = async (req, res) => {
  const { name, email } = req.body
  const exist = await userModel.findOne({
    where: {
      email: email,
    },
  })
  if (exist) {
    req.flash('error', 'User with This Email already exists')
    return res.redirect('login')
  } else {
    var password = Math.random().toString(36).slice(-8)
    const hashed_pass = bcrypt.hashSync(password, 10)
    await userModel
      .create({
        name_en: name,
        email,
        password: hashed_pass,
      })
      .then((user) => {
        SendEmail(user.email, password)
        req.flash(
          'success',
          'The password is set through E-mail, Please verify'
        )
        return res.redirect('/login')
      })
      .catch((err) => {
        return req.flash('error', err.message)
      })
  }
}

const logout = async (req, res) => {
  if (req.session.auth == true) {
    req.session.destroy()
    res.redirect('/login')
  } else {
    res.redirect('/login')
  }
}

const updatePassword_get = (req, res) => {
  userModel
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((userUpdate) => {
      res.render('admin/update-password', {
        success: true,
        message: 'find',
        data: userUpdate,
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    })
    .catch((error) => {
      res.send(error.message)
    })
}

const updatePassword_post = (req, res) => {
  const hashed_pass = bcrypt.hashSync(req.body.password, 10)
  let { password, cpassword } = req.body
  if (password == cpassword) {
    userModel
      .update(
        {
          password: hashed_pass,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((userModel) => {
        console.log(userModel)
        req.flash('success', ' User password Updated Successfully')
        return res.redirect('/admin/users')
      })
      .catch((error) => {
        req.flash('error', 'Please Check something is wrong', error.message)
        console.log(error.message)
        return res.redirect('/admin/users')
      })
  } else {
    req.flash('error', ' Both Password and Password must be Equal')
    return res.redirect('/admin/updatepassword/:id')
  }
}

module.exports = {
  addUser,
  Allusers,
  addUser_get,
  deleteUser,
  updateUser_get,
  updateUser_post,
  dashboard,
  userLogin_post,
  login,
  logout,
  signup_get,
  signup,
  updatePassword_get,
  updatePassword_post,
}
