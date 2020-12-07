const AccessControl = require('role-acl')
const ac = new AccessControl()
/** acl-role controls for CRUD operations on user records
 * @function
 */
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read')
  .on('users')
  .execute('update')
  .on('users')

ac.grant('admin')
  .execute('create')
  .on('users')
  .execute('update')
  .on('users')
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
    .on('users')

exports.update = (requester, data) =>
  ac
    .can(requester.role)
    .context({ requester: requester._id, owner: data._id })
    .execute('update')
    .sync()
    .on('users')
