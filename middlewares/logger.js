

function logger() {
    return async (ctx, next) => {
        const req = ctx.request
        console.log(
            `${new Date().toLocaleString()} [${req.method.toString().toUpperCase()}]  -- ${req.url}`
        )
        await next()
    }
}

module.exports = logger