const Sequelize = require('sequelize')
var db = require('../connection/connection')
const bcrypt = require('bcrypt')

const users = db.connection.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name_ar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cpassword: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isDelete: {
      type: Sequelize.INTEGER,
      defaultValue: '0',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
)

module.exports = users
