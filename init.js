const User = require('./models/user')
const Item = require('./models/item')


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
  const itemCount = await Item.count({})
  if (!itemCount) {
    const users = await User.find({})
    for (let i = 0; i < 20; i++) {
      Item.create({
        name: 'villa' + i,
        type: [0, 1, 2],
        desc: 'Sunny, good geographical location',
        tags: ["NICE",'COOL'],
        price: 930,
        position: 'Coventry',
        imgUrl: ['/test.png', '/test.png', '/test.png'],
        status: 0,
        createUser: users[0]._id
      })
    }
  }
}
