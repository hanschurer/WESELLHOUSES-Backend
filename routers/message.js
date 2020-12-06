const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const messageService = require('../service/message')
const Joi = require('joi')
const CanMsg = require('../permissions/message')
const isLogin = require('../middlewares/login')
router
  .get('/msgs/:itemId', isLogin, async ctx => {
    if (!CanMsg.read(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    ctx.body = await messageService.findAll({
      item: ctx.params.itemId
    })
  })
  .get('/msgs', isLogin, async ctx => {
    if (!CanMsg.read(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    const role = ctx.session.user.role
    if (role === 'admin') {
      ctx.body = await messageService.findAll()
    } else {
      ctx.body = await messageService.findByUser({
        userId: ctx.session.user._id
      })
    }
  })
  .post('/msg', isLogin, async ctx => {
    if (!CanMsg.create(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    const schema = Joi.object({
      content: Joi.string()
        .min(0)
        .max(200)
        .required(),
      item: Joi.string().required()
    })
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    ctx.body = await messageService.add({
      ...ctx.request.body,
      createUser: ctx.session.user._id
    })
  })
  .delete('/msg/:id', isLogin, async ctx => {
    const msg = await messageService.findOne(ctx.params.id)
    if (!CanMsg.read(ctx.session.user, { _id: msg.createUser }).granted) {
      ctx.throw(403, '')
      return
    }
    ctx.body = await messageService.remove(ctx.params.id)
  })
  .put('/msg/:id', isLogin, async ctx => {
    const msg = await messageService.findOne(ctx.params.id)
    if (!CanMsg.read(ctx.session.user, { _id: msg.createUser }).granted) {
      ctx.throw(403, '')
      return
    }
    const schema = Joi.object({
      status: Joi.number().required()
    })
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    await messageService.update(ctx.params.id, ctx.request.body)
    ctx.body = {}
  })
module.exports = router
