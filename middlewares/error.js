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
