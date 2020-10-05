const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');

// The koa-router provides a router.prefix method, which is a global configuration for a router and is automatically added to all paths of the router.
const router = Router({prefix:'/api/v1/users'});

  

router.get('/',getAllUsers);
router.post('/',bodyParser(),createUser);

//In koa, we often need to map all the routes that match a certain schema to the same method. For example, we have a user's routing widget, and we need to use this method to render the routes for all users with different IDs. So, we can use "dynamic path parameters" in koa's route paths
router.get('/:id([0-9]{1,})',getById);
router.put('/:id([0-9]{1,})',updateUser);
router.del('/:id([0-9]{1,})',deleteUser);



function getAllUsers(ctx){
    ctx.body = 'This is a list of all users';
}

function createUser(ctx){
    ctx.body= 'You can create a user here!';
}
//The koa-router supports custom routing with a colon in url, which is mounted on the context and can be easily retrieved from context.params.paramName.
function getById(ctx){
    let id= ctx.params.id;
    ctx.body= 'This is the specific User you looking for'+ id;

}
function updateUser(ctx){
    ctx.body= 'Update information for you user';

}
function deleteUser(ctx){
    ctx.body= 'You can delete a user here ;)';

}

module.exports = router;