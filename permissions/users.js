const AccessControl = require('role-acl')
const ac = new AccessControl()

// controls for CRUD operations on user records
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read')
  .execute('update')
  .on('users')

ac.grant('admin')
  .execute('create')
  .execute('update')
  .execute('read')
  .on('users')
ac.grant('admin')
  .condition({ Fn: 'NOT_EQUALS', args: { requester: '$.owner' } })
  .execute('delete')
  .on('users')

exports.read = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('read')
    .sync()
    .on('user')

exports.update = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('update')
    .sync()
    .on('user')

exports.delete = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('delete')
    .sync()
    .on('user')
