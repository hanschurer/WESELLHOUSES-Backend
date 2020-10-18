const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const Users = require('../models/users');
const authenticate = require('../controllers/auth');
const { validateUser } = require('../controllers/validation');
// The koa-router provides a router.prefix method, which is a global configuration for a router and is automatically added to all paths of the router.
const router = Router({prefix:'/api/v1/users'});

const can = require('../permissions/users')
const Can = require('../controllers/permission');
  

router.get('/', authenticate, getAllUsers);
router.post('/',bodyParser(), validateUser, createUser);

//In koa, we often need to map all the routes that match a certain schema to the same method. For example, we have a user's routing widget, and we need to use this method to render the routes for all users with different IDs. So, we can use "dynamic path parameters" in koa's route paths
router.get('/:id([0-9]{1,})',authenticate, getById);
router.put('/:id([0-9]{1,})',authenticate,bodyParser(), validateUser, updateUser);
router.del('/:id([0-9]{1,})',authenticate,deleteUser);



async function getAllUsers(ctx){
    const permissions = can.readAll(ctx.state.user);
    if(!permissions.granted){
        ctx.status=403;
    }else{
        const result = await Users.getAll();
        if (result.length){
            ctx.body =result;
        }
    }
}


//The koa-router supports custom routing with a colon in url, which is mounted on the context and can be easily retrieved from context.params.paramName.

async function getById(ctx){
    let id= ctx.params.id;
    const result = await Users.getById(id);
    if(result.length){
        const data = result[0];
        const permission = can.read(ctx.state.user, data);
        if (!permission.granted){
            ctx.status=403;
        }else{
            ctx.body = permission.filter(data);
        }
    }
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
      let data = result[0];
      const permissions = can.update(ctx.state.user, data);
      if (!permissions.granted){
          ctx.status = 403;
      }else {
          const newDate = permissions.filter(ctx.request.body);
            Object.assign(newDate,{ID: id});
            result = await Users.update(newDate);
            if (result.affectedRows) {
                ctx.body = {ID: id, updated: true, link: ctx.request.path};
         }
      }  
    }
  }

async function deleteUser(ctx) {
  const id = ctx.params.id;
  const result = await Users.getById(id);
  if (result.length) {
    const data = result[0];
    console.log("trying to delete", data);
    const permission = can.delete(ctx.state.user, data);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      result = await Users.delById(id);
      if (result.affectedRows) {
        ctx.body = {ID: id, deleted: true}
      }      
    }
  }
}


module.exports = router;