const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const Users = require('../models/users')
// The koa-router provides a router.prefix method, which is a global configuration for a router and is automatically added to all paths of the router.
const router = Router({prefix:'/api/v1/users'});

  

router.get('/',getAllUsers);
router.post('/',bodyParser(),createUser);

//In koa, we often need to map all the routes that match a certain schema to the same method. For example, we have a user's routing widget, and we need to use this method to render the routes for all users with different IDs. So, we can use "dynamic path parameters" in koa's route paths
router.get('/:id([0-9]{1,})',getById);
router.put('/:id([0-9]{1,})',bodyParser(),updateUser);
router.del('/:id([0-9]{1,})',deleteUser);



async function getAllUsers(ctx){
    const result = await Users.getAll();
    if (result.length){
        ctx.body =result;
    }
}


//The koa-router supports custom routing with a colon in url, which is mounted on the context and can be easily retrieved from context.params.paramName.

async function getById(ctx){
    let id= ctx.params.id;
    const result = await Users.getById(id);
    if(result.length){
        const user = result[0];
    }
    ctx.body = result[0];

}


async function createUser(ctx) {
    const body = ctx.request.body;
    const result = await Users.add(body);
    if (result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  }


  async function updateUser(ctx) {
    const id = ctx.params.id;
    let result = await Users.getById(id);  // check it exists
    if (result.length) {
      let user = result[0];
      // exclude fields that should not be updated
      const {ID, dateRegistered, ...body} = ctx.request.body;
      Object.assign(user, body); // overwrite updatable fields with body data
      result = await Users.update(user);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }

async function deleteUser(ctx) {
  const id = ctx.params.id;
  const result = await Users.delById(id);
  if (result.affectedRows) {
    ctx.body = {ID: id, deleted: true}
  }
}


module.exports = router;