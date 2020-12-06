const Koa = require('koa')
const routers = require('./routers/index')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const error = require('./middlewares/error')
const logger = require('./middlewares/logger')
const staticKoa = require('koa-static')
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
app.use(staticKoa(path.join(__dirname, config.staticPath)))
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
      'x-requested-with',
      'uid'
    ]
  })
)
if (process.env.NODE_ENV === 'test') {
  app.use(async (ctx, next) => {
    if (ctx.get('uid')) {
      ctx.session.user = await mongoose
        .model('user')
        .findOne({ _id: ctx.get('uid') })
      ctx.session.token = ctx.get('authorization')
      await next()
    } else {
      await next()
    }
  })
}
app.use(routers())
app.use(ctx => {
  ctx.throw(404, 'URL error')
})

module.exports = app
