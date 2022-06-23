const isLoggedIn = (req, res, next) => {
  if (req.session.auth == true) {
    next()
  } else {
    res.redirect('/login')
  }
}

const isAlreadyLogin = (req, res, next) => {
  if (req.session.auth == true) {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

module.exports = { isLoggedIn, isAlreadyLogin }
