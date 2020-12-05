const prefix = '/api/v1'
const router = require('koa-router')({ prefix })
const itemService = require('../service/item')
const Joi = require('joi')
const CanUser = require('../permissions/users')
const isLogin = require('../middlewares/login')
router.post('/items', isLogin, async ctx => {
  ctx.body = await itemService.findAll(ctx.request.body)
})
module.exports = router
