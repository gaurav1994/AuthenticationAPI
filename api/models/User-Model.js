const mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
     username : String,
     googleId : String,
     githubId : String,
     picture : String
})

module.exports = mongoose.model('User', UserSchema, 'users')
