const mongoose = require('mongoose')




/**
* A item schema
* @module models/item
* @author Han Wang
* @types {arry} = [
*   'Houses', //0
   'Apartment', //1
  'Flat', //2
  'Garden', //3
  'Swimming pool', //4
  'Garage' //5
]
*/

const item = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: [Number],
    desc: {
      type: String,
      default: ''
    },
    tags: [String],
    price: {
      type: Number
    },
    position: {
      type: String,
      default: ''
    },
    imgUrl: [String],
    videoUrl: String,
    status: {
      type: Number,
      default: 0 //0 display  1 hide
    },
    createUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('item', item)
