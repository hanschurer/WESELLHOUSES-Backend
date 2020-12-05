const User = require('./models/user')
const UserService = require('./service/user')
module.exports = async function() {
  const count = await User.count({})
  if (!count) {
    await UserService.add({
      username: 'admin',
      password: 'admin111',
      email: 'admin@admin.com',
      firstName: 'ffff',
      lastName: 'llll',
      role: 'admin'
    })
  }
}
