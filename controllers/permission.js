const can = require('../permissions/users');

module.exports = async function checkPermission(ctx,next){

        const permissions = can.readAll(ctx.state.user);
        if(!permissions.granted){
            ctx.status=403;
        }else{
            await next();
        }

        
}