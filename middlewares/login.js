const Jwt = require('jsonwebtoken')
 /**
     * to handle error
     * @param {ctx} ctx The Koa request/response context object
     * @param {next} next The Koa next callback
     * @throws 401 user have not log in
     * @throws 400 incorrent username and password
     */
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
  } catch (error) {
    ctx.throw(400, 'Incorrect account and password')
  }
  await next()
}
