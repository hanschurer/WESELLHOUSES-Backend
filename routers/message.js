const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const messageService = require('../service/message')
const itemService = require('../service/item')
const Joi = require('joi')
const CanMsg = require('../permissions/message')
const isLogin = require('../middlewares/login')
router
  .get('/msgs/:itemId', async ctx => {
    const data = await messageService.findAll({
      item: ctx.params.itemId
    })
    ctx.body = data.map(item => {
      return {
        ...item._doc,
        links: {
          item: `${ctx.protocol}://${ctx.host}${prefix}/item/${ctx.params.itemId}`
        }
      }
    })
  })
  .get('/msgs', isLogin, async ctx => {
    if (!CanMsg.read(ctx.session.user, {}).granted) {
      ctx.throw(403, '')
      return
    }
    const role = ctx.session.user.role
    let data = []
    if (role === 'admin') {
      data = await messageService.findAll()
    } else {
      data = await messageService.findByUser({
        userId: ctx.session.user._id
      })
    }
    ctx.body = data.map(item => {
      return {
        ...item._doc,
        links: {
          item: `${ctx.protocol}://${ctx.host}${prefix}/item/${item.item}`
        }
      }
    })
  })
  .get('/action/msgs', isLogin, async ctx => {
    const role = ctx.session.user.role
    let data = []
    if (role === 'admin') {
      data = await messageService.findAll({
        status: 'all'
      })
    } else {
      const items = await itemService.findAll({
        createUser: ctx.session.user._id
      })
      const itemIds = items.map(item => item._id)
      data = await messageService.findByUser({
        itemIds,
        status: 'all'
      })
    }
    ctx.body = data.map(item => {
      return {
        ...item._doc,
        links: {
          item: `${ctx.protocol}://${ctx.host}${prefix}/item/${item.item}`
        }
      }
    })
  })
  .post('/msg', async ctx => {
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
    const data = await messageService.add({
      ...ctx.request.body
    })
    ctx.body = {
      ...data._doc,
      links: {
        item: `${ctx.protocol}://${ctx.host}${prefix}/item/${data.item}`
      }
    }
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
    ctx.body = {
      links: {
        item: `${ctx.protocol}://${ctx.host}${prefix}/item/${msg.item}`
      }
    }
  })
module.exports = router
