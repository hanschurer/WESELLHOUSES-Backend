const AccessControl = require('role-acl')
const ac = new AccessControl()

// controls for CRUD operations on user records
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('delete')
  .on('message')
  .execute('update')
  .on('message')

ac.grant('user')
  .execute('create')
  .on('message')
  .execute('read')
  .on('message')

ac.grant('admin')
  .execute('create')
  .on('message')
  .execute('delete')
  .on('message')
  .execute('update')
  .on('message')
  .execute('read')
  .on('message')

exports.create = requester =>
  ac
    .can(requester.role)
    .execute('create')
    .sync()
    .on('message')

exports.read = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('read')
    .sync()
    .on('message')

exports.update = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('update')
    .sync()
    .on('message')

exports.delete = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('delete')
    .sync()
    .on('message')
