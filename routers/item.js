const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const itemService = require('../service/item')
const Joi = require('joi')
const CanUser = require('../permissions/users')
const isLogin = require('../middlewares/login')
router
  .post('/items', isLogin, async ctx => {
    ctx.body = await itemService.findAll(ctx.request.body)
  })
  .post('/item', isLogin, async ctx => {
    ctx.body = await itemService.add({
      ...ctx.request.body,
      createUser: ctx.session.user._id
    })
  })
  .delete('/item/:id', isLogin, async ctx => {
    ctx.body = await itemService.remove(ctx.params.id)
  })
  .put('/item/:id', isLogin, async ctx => {
    await itemService.update(ctx.params.id, ctx.request.body)
    ctx.body = {}
  })
module.exports = router
