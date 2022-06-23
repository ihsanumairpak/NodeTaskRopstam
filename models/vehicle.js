const Sequelize = require('sequelize')
var db = require('../connection/connection')
const bcrypt = require('bcrypt')

const vehicle = db.connection.define(
  'vehicle',
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
    category: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Model: {
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

module.exports = vehicle
