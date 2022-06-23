const jwt = require('jsonwebtoken')
const user = require('../models/users')

const config = process.env
const protect = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

const superAdmin = async (req, res, next) => {
  try {
    const user = req.session.user
    if (user.type === 'SuperAdmin') {
      next()
    } else {
      req.flash('error', 'You are not authorized Super Admin')
      res.render('admin/dashboard', {
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    }
  } catch (error) {
    return req.flash('error', error.message)
  }
}

const companyAdmin = (req, res, next) => {
  try {
    const user = req.session.user
    if (user.type === 'Company Admin') {
      next()
    } else {
      req.flash('error', 'You are not authorized Company Admin')
      res.render('admin/dashboard', {
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    }
  } catch (error) {
    return req.flash('error', error.message)
  }
}

const agencyAdmin = (req, res, next) => {
  try {
    const user = req.session.user
    if (user.type === 'Agency Admin') {
      next()
    } else {
      req.flash('error', 'You are not authorized Agency Admin')
      res.render('admin/dashboard', {
        successFlash: req.flash('success'),
        errorFlash: req.flash('error'),
      })
    }
  } catch (error) {
    return req.flash('error', error.message)
  }
}

module.exports = { protect, superAdmin, companyAdmin, agencyAdmin }
