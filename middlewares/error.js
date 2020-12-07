 /**
     * to handle error
     * @param {ctx} ctx The Koa request/response context object
     * @param {next} next The Koa next callback
     */
function error() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status
      ctx.body = {
        message: err.toString()
      }
    }
  }
}

module.exports = error
