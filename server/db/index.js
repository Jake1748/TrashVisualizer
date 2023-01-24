//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Trashbag = require('./models/Trashbag')

//associations could go here!
User.hasMany(Trashbag)
Trashbag.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Trashbag
  },
}
