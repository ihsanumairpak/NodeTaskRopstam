const express = require('express')
const Connection = require('./connection/connection')
const jwt = require('jsonwebtoken')
const { authenticateJWT } = require('./middleware/auth')
const sequelize = require('sequelize')
const adminRoutes = require('./routes/admin/allRoutes')
const dotenv = require('dotenv')
const app = express()
var path = require('path')
var cors = require('cors')
const passport = require('passport')
var session = require('express-session')
dotenv.config()
const flash = require('express-flash')
var cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const methodOverride = require('method-override')
const fs = require('fs')
var busboy = require('connect-busboy')

app.use(busboy())
app.use(
  fileupload({
    limits: {
      fileSize: 2048 * 2048, // 2 MB file size limit
    },
    abortOnLimit: true,
  })
)

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
)
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(adminRoutes)

app.use(cors())
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    errors: err.errors,
  })
})

app.use('*/', (req, res, next) => {
  res.render('admin/error')
})

app.listen(process.env.PORT || 5000, () =>
  console.log('server is listening at port 5000')
)
