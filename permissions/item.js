const AccessControl = require('role-acl')
const ac = new AccessControl()

// controls for CRUD operations on user records
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('delete')
  .on('item')
  .execute('update')
  .on('item')

ac.grant('user')
  .execute('create')
  .on('item')
  .execute('read')
  .on('item')

ac.grant('admin')
  .execute('create')
  .on('item')
  .execute('delete')
  .on('item')
  .execute('update')
  .on('item')
  .execute('read')
  .on('item')

exports.create = requester =>
  ac
    .can(requester.role)
    .execute('create')
    .sync()
    .on('item')

exports.read = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('read')
    .sync()
    .on('item')

exports.update = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('update')
    .sync()
    .on('item')

exports.delete = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('delete')
    .sync()
    .on('item')
