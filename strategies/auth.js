const passport = require('koa-passport')
const local = require('../strategies/local')

passport.use(local)

module.exports = passport.authenticate(['local'], { session: false })
