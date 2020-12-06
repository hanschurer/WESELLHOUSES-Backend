function logger() {
  return async (ctx, next) => {
    if (process.env.NODE_ENV === 'test') {
      await next()
    } else {
      const req = ctx.request
      console.log(
        `${new Date().toLocaleString()} [${req.method
          .toString()
          .toUpperCase()}]  -- ${req.url}`
      )
      await next()
    }
  }
}

module.exports = logger
