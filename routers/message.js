const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const messageService = require('../service/message')
const Joi = require('joi')
const CanUser = require('../permissions/users')
const isLogin = require('../middlewares/login')
router
  .get('/msgs/:itemId', isLogin, async ctx => {
    ctx.body = await messageService.findAll({
      item: ctx.params.itemId
    })
  })
  .post('/msg', isLogin, async ctx => {
    ctx.body = await messageService.add({
      ...ctx.request.body,
      createUser: ctx.session.user._id
    })
  })
  .delete('/msg/:id', isLogin, async ctx => {
    ctx.body = await messageService.remove(ctx.params.id)
  })
  .put('/msg/:id', isLogin, async ctx => {
    await messageService.update(ctx.params.id, ctx.request.body)
    ctx.body = {}
  })
module.exports = router
