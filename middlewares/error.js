

function error() {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.error(err)
            ctx.body = {
                code: -1,
                err: err.toString(),
                message: 'internal server error'
            }
        }
    }
}

module.exports = error