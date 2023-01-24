const Sequelize = require('sequelize')
const db = require('../db')

const Trashbag = db.define('trashbag', {
  fullness: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: true
  }
})

module.exports = Trashbag