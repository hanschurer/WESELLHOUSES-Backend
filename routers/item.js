const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const itemService = require('../service/item')
const Joi = require('joi')
const CanItem = require('../permissions/item')
const isLogin = require('../middlewares/login')
router
  .post('/items', isLogin, async ctx => {
    if (!CanItem.read(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    ctx.body = await itemService.findAll(ctx.request.body)
  })
  .post('/item', isLogin, async ctx => {
    if (!CanItem.create(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    const schema = Joi.object({
      name: Joi.string()
        .max(50)
        .required(),
      desc: Joi.string()
        .max(200)
        .required(),
      position: Joi.string()
        .max(200)
        .required(),
      type: Joi.array(),
      tags: Joi.array(),
      imgUrl: Joi.array(),
      price: Joi.number(),
      status: Joi.number()
    })
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    ctx.body = await itemService.add({
      ...ctx.request.body,
      createUser: ctx.session.user._id
    })
  })
  .get('/item/:id', isLogin, async ctx => {
    if (!CanItem.read(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    ctx.body = await itemService.findOne(ctx.params.id)
  })
  .delete('/item/:id', isLogin, async ctx => {
    const item = await itemService.findOne(ctx.params.id)
    if (
      !CanItem.delete(ctx.session.user, {
        _id: item.createUser && item.createUser._id.toString()
      }).granted
    ) {
      ctx.throw(403, '')
      return
    }
    ctx.body = await itemService.remove(ctx.params.id)
  })
  .put('/item/:id', isLogin, async ctx => {
    const item = await itemService.findOne(ctx.params.id)
    if (
      !CanItem.update(ctx.session.user, {
        _id: item.createUser && item.createUser._id.toString()
      }).granted
    ) {
      ctx.throw(403, '')
      return
    }
    const schema = Joi.object({
      name: Joi.string()
        .max(50)
        .required(),
      desc: Joi.string()
        .max(200)
        .required(),
      position: Joi.string()
        .max(200)
        .required(),
      type: Joi.array(),
      tags: Joi.array(),
      imgUrl: Joi.array(),
      price: Joi.number(),
      status: Joi.number()
    })
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    await itemService.update(ctx.params.id, ctx.request.body)
    ctx.body = {}
  })
module.exports = router
