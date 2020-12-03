const Koa =require('koa');
const Router= require('koa-router');
const users = require('./routes/users.js');
const items = require('./routes/items')
const messages= require('./routes/messages');
const cors = require('koa2-cors')

const app= new Koa();

app.use(cors());
app.use(users.routes());
app.use(items.routes());
app.use(messages.routes());

module.exports=app;