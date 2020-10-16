const Koa =require('koa');
const Router= require('koa-router');
const users = require('./routes/users.js');
const items = require('./routes/items')


const app= new Koa();


app.use(users.routes());
app.use(items.routes());



app.listen(3000);