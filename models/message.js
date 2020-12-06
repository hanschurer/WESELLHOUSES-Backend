const mongoose = require('mongoose')

const message = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: 0 //0 display  1 hide
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('message', message)
