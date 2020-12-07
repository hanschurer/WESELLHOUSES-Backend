const compose = require('koa-compose')
const glob = require('glob')
const path = require('path')
/**
* A module to autoloading routes for the current directory
* @module routers/index
* @author Han Wang
*/
const registerRouters = () => {
  let routers = []
  glob
    .sync(path.resolve(__dirname, './*.js'))
    .filter(filename => filename.indexOf('index.js') === -1)
    .map(router => {
      routers.push(require(router).routes())
      routers.push(require(router).allowedMethods())
    })

  return compose(routers)
}

module.exports = registerRouters
