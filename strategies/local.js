const Strategy = require('passport-local').Strategy
const users = require('../service/user')
const bcrypt = require('bcrypt')

const verifyPassword = function(user, password) {
  // compare hash of password with the stored hash in the DB
  const isMatch = bcrypt.compareSync(password, user.password)
  return isMatch
}

const checkUserAndPass = async (username, password, done) => {
  // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome
  let result
  try {
    result = await users.find('username', username)
  } catch (error) {
    console.error(`Error during authentication for user ${username}`)
    return done(error)
  }
  if (result) {
    const user = result
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${username}`)
      return done(null, user)
    }
  }
  return done(null, false, { message: 'Password incorrect for user' })
}

const strategy = new Strategy({}, checkUserAndPass)
module.exports = strategy
