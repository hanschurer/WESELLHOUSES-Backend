const Message = require('../models/message')
module.exports = {
  findOne(_id) {
    return Message.findOne({ _id })
  },
  add(data) {
    return Message.create(data)
  },
  remove(_id) {
    return Message.remove({ _id })
  },
  update(_id, data) {
    return Message.findByIdAndUpdate(_id, data)
  },
  findAll(query = {}) {
    const params = { status: 0 }
    if (query.item) {
      params.item = query.item
    }
    return Message.find(params)
      .populate('createUser')
      .sort({ createdAt: -1 })
  },
  findByUser(query = {}) {
    const params = { status: 0, createUser: query.userId }
    if (query.item) {
      params.item = query.item
    }
    return Message.find(params)
      .populate('createUser')
      .sort({ createdAt: -1 })
  }
}
