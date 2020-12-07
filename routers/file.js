const router = require('koa-router')({ prefix: '/api/v1' })
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')


router.post('/file', async ctx => {
  let file = ctx.request.files.file
  if (!file) {
    ctx.status = 500
    ctx.throw(500, 'the file does not exist')
    return
  }
  let fileName = uuid()
  let ext = file.name.substring(file.name.lastIndexOf('.'))
  let reader = fs.createReadStream(file.path)
  let writer = fs.createWriteStream(
    path.join(__dirname, '../static/upload/', fileName + ext)
  )
  reader.pipe(writer)
  ctx.body = {
    path: '/upload/' + fileName + ext
  }
})

module.exports = router
