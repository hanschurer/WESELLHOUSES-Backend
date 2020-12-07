const Message = require('../models/message')

/**
* CRUD operation on message
* @module service/item
* @author Han Wang
* @param int item id
* @param  object data
* @return Mogoose model
*/
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
    if (query.status === 'all') {
      delete params.status
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
    if (query.itemIds) {
      params.item = { $in: query.itemIds }
    }
    if (query.status === 'all') {
      delete params.status
    }
    return Message.find(params)
      .populate('createUser')
      .sort({ createdAt: -1 })
  }
}
