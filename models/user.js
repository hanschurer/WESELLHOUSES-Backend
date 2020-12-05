const mongoose = require('mongoose')

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
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
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
