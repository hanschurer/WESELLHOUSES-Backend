const router = require('koa-router')({ prefix: '/api/v1' })
const fs = require('fs')
const path = require('path')
router.post('/file', async ctx => {
  let file = ctx.request.files.file
  if (!file) {
    ctx.status = 500
    ctx.throw(500, 'the file does not exist')
    return
  }
  let reader = fs.createReadStream(file.path)
  let writer = fs.createWriteStream(
    path.join(__dirname, '../static/upload/', file.name)
  )
  reader.pipe(writer)
  ctx.body = {
    path: '/upload/' + file.name
  }
})

module.exports = router
