const mongoose = require('mongoose')
/**
* A user schema
* @module models/user
* @author Han Wang
*/
const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    passwordSalt: {
      type: String,
      default: ''
    },
    avatarURL: {
      type: String,
      default: '/avatar.jpg'
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('user', user)
