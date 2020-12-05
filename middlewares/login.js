const Jwt = require('jsonwebtoken')
function login() {
  return async (ctx, next) => {
    const token = ctx.get('token')
    if (!ctx.session.token) {
      ctx.throw(401, 'Please log in')
    }
    if (ctx.session.token !== token) {
      ctx.throw(401, 'Please log in')
    }
    try {
      jwt.verify(token, 'token')
      await next()
    } catch (error) {
      ctx.throw(401, 'Please log in')
    }
  }
}

module.exports = login
