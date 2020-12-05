const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const userService = require('../service/user')
const authenticate = require('../strategies/auth')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')
const CanUser = require('../permissions/users')
router
  .post('/login', authenticate, async ctx => {
    const { _id, username, email } = ctx.state.user._doc
    const links = {
      self: `${ctx.protocol}://${ctx.host}${prefix}/${_id}`
    }
    const token = Jwt.sign(ctx.state.user._doc, 'token', { expiresIn: '1d' })
    ctx.session.token = token
    ctx.session.user = ctx.state.user
    ctx.body = { _id, username, email, token, links }
  })
  .post('/users', async ctx => {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      email: Joi.string().email()
    })
    const { error, value } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    // check
    let isExist = await userService.find('username', value.username)
    if (isExist) {
      ctx.status = 400
      ctx.throw(400, 'the username already exists')
    }
    let user = await userService.add(value)
    ctx.status = 201
    ctx.body = {
      _id: user._id,
      ...user._doc,
      password: undefined,
      passwordSalt: undefined,
      link: `${ctx.request.path}/${user._id}`
    }
  })
  /**
   * get userinfo
   */
  .get('/user/:id', async ctx => {
    if (!CanUser.read(ctx.session.user, ctx.params).granted) {
      ctx.throw(403, '')
      return
    }
    const _id = ctx.params.id
    let user = await userService.find({
      _id
    })
    if (!user) {
      ctx.status = 404
      ctx.body = { message: 'fail to get user information' }
    }
    ctx.body = {
      ...user._doc,
      password: undefined,
      passwordSalt: undefined
    }
  })
  /**
   * update userinfo
   */
  .put('/user/:id', async ctx => {
    if (!CanUser.read(ctx.session.user, ctx.params).granted) {
      ctx.throw(403, '')
      return
    }
    const _id = ctx.params.id
    const user = ctx.request.body
    await userService.update(_id, user)
    ctx.body = {
      message: 'success'
    }
  })
module.exports = router
