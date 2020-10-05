const Koa =require('koa');
const Router= require('koa-router');
const users = require('./routes/users.js');


const app= new Koa();
const router= new Router();

router.get('/api/v1',(ctx)=>{
    ctx.body={
        message:"wellcome to my first API which is  really cool!"
    }
})

app.use(router.routes());
app.use(users.routes());




app.listen(3000);