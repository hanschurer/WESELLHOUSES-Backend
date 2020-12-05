const Koa = require('koa')
const routers = require('./routers/index')
const static = require('koa-static')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const error = require('./middlewares/error')
const logger = require('./middlewares/logger')
const path = require('path')
const mongoose = require('mongoose')
const session = require('koa-session')
const config = require('./config')
const init = require('./init')
const app = new Koa()

mongoose.connect(config.atlasURI, {
  useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
  console.log('[App] MongoDB connected success.')
  init()
})
mongoose.connection.on('error', err => {
  console.log(err)
  console.log('[App] MongoDB connected fail.')
})
app.keys = ['secret']
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}
app.use(session(CONFIG, app))
app.use(error())
app.use(logger())

app.use(static(path.join(__dirname, config.staticPath)))
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 400 * 1024 * 1024
    }
  })
)
app.use(
  cors({
    origin: function() {
      return 'http://localhost:3000'
    },
    credentials: true,
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'x-requested-with'
    ]
  })
)
app.use(routers())
app.use(ctx => {
  ctx.throw(404, 'URL error')
})

module.exports = app
