const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Items = require('../models/items');

const router = Router({prefix: '/api/v1/items'});

const {validateItem} = require('../controllers/validation')


// items routes
router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);

router.post('/', bodyParser(), validateItem, createItem);
router.put('/:id([0-9]{1,})', bodyParser(), validateItem, updateItem);
router.del('/:id([0-9]{1,})', deleteItem);

// views route
//router.get('/:id([0-9]{1,})/views', getViewCount);

// categories routes
// router.get('/:id([0-9]{1,})/categories', getAllCategories);
// router.post('/:id([0-9]{1,})/categories/:cid([0-9]{1,})', auth, addCategory);
// router.del('/:id([0-9]{1,})/categories/:cid([0-9]{1,})', auth, removeCategory);

// comments routes
// router.get('/:id([0-9]{1,})/comments', getAllComments);
// router.post('/:id([0-9]{1,})/comments', auth, bodyParser(), addCommentIds, validateComment, addComment);


async function getAll(ctx) {
  let items = await Items.getAll();
  if (items.length) {
    ctx.body = items;
  }
}

async function getById(ctx) {
  let id = ctx.params.id;
  let items = await Items.getById(id);
  if (items.length) {
    ctx.body = items[0];
  }
}

async function createItem(ctx) {
  const body = ctx.request.body;
  const result = await Items.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

async function updateItem(ctx) {
  const id = ctx.params.id;
  let result = await Items.getById(id);  // check it exists
  if (result.length) {
    let item = result[0];
    // exclude fields that should not be updated for example property_id will not be update even though it has been put by user
    const {property_id, ...body} = ctx.request.body;
    // overwrite updatable fields with remaining body data
    Object.assign(item, body);
    result = await Items.update(item);
    if (result.affectedRows) {
      ctx.body = {ID: id, updated: true, link: ctx.request.path};
    }
  }
}

async function deleteItem(ctx) {
  const id = ctx.params.id;
  const result = await Items.delById(id);
  if (result.affectedRows) {
    ctx.body = {ID: id, deleted: true}
  }
}

// async function getViewCount(ctx) {
//   const id = ctx.params.id;
//   const result = await articleViews.count(id);
//   if (result.length) {
//     ctx.body = {ID: id, views: result[0].views};
//   }
// }

// async function addCategory(ctx) {
//   const articleID = ctx.params.id;
//   const categoryID = ctx.params.cid;
//   const result = await articleCategories.add(articleID, categoryID);
//   if (result.affectedRows) {
//     ctx.status = 201;
//     ctx.body = {added: true};
//   }
// }

// async function removeCategory(ctx) {
//   const articleID = ctx.params.id;
//   const categoryID = ctx.params.cid;
//   const result = await articleCategories.delete(articleID, categoryID);
//   if (result.affectedRows) {
//     ctx.body = {deleted: true};
//   }
// }

// async function getAllCategories(ctx) {
//   const id = ctx.params.id;
//   const result = await articleCategories.getAll(id);
//   if (result.length) {
//     ctx.body = result;
//   }
// }

// async function getAllComments(ctx) {
//   const id = ctx.params.id;
//   const result = await comments.getAll(id);
//   if (result.length) {
//     ctx.body = result;
//   }
// }

// async function addComment(ctx) {
//   const comment = ctx.request.body;
//   const result = await comments.add(comment);
//   if (result.affectedRows) {
//     const id = result.insertId;
//     ctx.status = 201;
//     ctx.body = {ID: id, created: true};
//   }
// }

// function addCommentIds(ctx, next) {
//   // every comment needs an article ID and a user ID
//   const id = parseInt(ctx.params.id);
//   const uid = ctx.state.user.ID;
//   Object.assign(ctx.request.body, {articleID: id, authorID: uid})
//   return next();
// }
module.exports = router;
