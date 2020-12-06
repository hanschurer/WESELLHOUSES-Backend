const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const itemService = require('../service/item')
const Joi = require('joi')
const CanItem = require('../permissions/item')
const isLogin = require('../middlewares/login')
router
  .post('/items', async ctx => {
    const data = await itemService.findAll(ctx.request.body)
    ctx.body = data.map(item => {
      return {
        ...item._doc,
        links: {
          msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`
        }
      }
    })
  })
  .post('/action/items', isLogin, async ctx => {
    const user = ctx.session.user
    if (user.role === 'admin') {
      const data = await itemService.findAll({
        ...ctx.request.body,
        status: 'all'
      })
      ctx.body = data.map(item => {
        return {
          ...item._doc,
          links: {
            msgs: `${ctx.protocol}://${ctx.host}${prefix}/items`
          }
        }
      })
    } else {
      const data = await itemService.findAll({
        ...ctx.request.body,
        createUser: user._id,
        status: 'all'
      })
      ctx.body = data.map(item => {
        return {
          ...item._doc,
          links: {
            msgs: `${ctx.protocol}://${ctx.host}${prefix}/items`
          }
        }
      })
    }
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
    const data = await itemService.add({
      ...ctx.request.body,
      createUser: ctx.session.user._id
    })
    ctx.body = {
      ...data._doc,
      links: {
        msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`,
        items: `${ctx.protocol}://${ctx.host}${prefix}/items`
      }
    }
  })
  .get('/item/:id', async ctx => {
    const data = await itemService.findOne(ctx.params.id)
    ctx.body = {
      ...data._doc,
      links: {
        msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`,
        items: `${ctx.protocol}://${ctx.host}${prefix}/items`
      }
    }
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
    const data = await itemService.remove(ctx.params.id)
    ctx.body = {
      ...data._doc,
      links: {
        msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`,
        items: `${ctx.protocol}://${ctx.host}${prefix}/items`
      }
    }
  })
  .put('/item/status/:id', isLogin, async ctx => {
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
      status: Joi.number()
    })
    const { error } = schema.validate(ctx.request.body)
    if (error) {
      ctx.throw(400, error)
    }
    await itemService.update(ctx.params.id, ctx.request.body)
    ctx.body = {
      links: {
        msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`,
        items: `${ctx.protocol}://${ctx.host}${prefix}/items`
      }
    }
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
    ctx.body = {
      links: {
        msgs: `${ctx.protocol}://${ctx.host}${prefix}/msgs`,
        items: `${ctx.protocol}://${ctx.host}${prefix}/items`
      }
    }
  })
module.exports = router
