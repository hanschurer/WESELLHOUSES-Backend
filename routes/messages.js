const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Messages = require('../models/messages');
const prefix = '/api/v1/messages'
const router = Router({prefix:prefix});


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.post('/', bodyParser(), createMessage);
router.put('/:id([0-9]{1,})', bodyParser(), updateMessage);
router.del('/:id([0-9]{1,})', deleteMessage);


async function getAll(ctx) {
    let messages = await Messages.getAll();
    if (messages.length) {
      ctx.body = messages;
    }
  }
  
  async function getById(ctx) {
    let id = ctx.params.id;
    let messages = await Messages.getById(id);
    if (messages.length) {
      ctx.body = messages[0];
    }
  }
  
  async function createMessage(ctx) {
    const body = ctx.request.body;
    const result = await Messages.add(body);
    if (result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  }
  
  async function updateMessage(ctx) {
    const id = ctx.params.id;
    let result = await Messages.getById(id);  // check it exists
    if (result.length) {
      let message = result[0];
      // exclude fields that should not be updated for example property_id will not be update even though it has been put by user
      const {id, ...body} = ctx.request.body;
      // overwrite updatable fields with remaining body data
      Object.assign(message, body);
      result = await Messages.update(message);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
  
  async function deleteMessage(ctx) {
    const id = ctx.params.id;
    const result = await Messages.delById(id);
    if (result.affectedRows) {
      ctx.body = {ID: id, deleted: true}
    }
  }


  module.exports = router;
