const Jwt = require('jsonwebtoken')
module.exports = async (ctx, next) => {
  const token = ctx.get('authorization')
  if (!ctx.session.token) {
    ctx.throw(401, 'Please log in')
  }
  if (ctx.session.token !== token) {
    ctx.throw(401, 'Please log in')
  }
  try {
    Jwt.verify(token, 'token')
    await next()
  } catch (error) {
    ctx.throw(401, 'Please log in')
  }
}
