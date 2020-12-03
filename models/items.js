const db = require('../helpers/database');

//get a single item by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM items WHERE id = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

//list all the items in the database
exports.getAll = async function getAll (page, limit, order, direction) {
  // const offset = (page - 1)* limit;
  // let query;
  // if (direction === 'DESC') {
  //   query = "SELECT * FROM articles ORDER BY ?? DESC LIMIT ? OFFSET ?;";
  // } else {
  //   query = "SELECT * FROM articles ORDER BY ?? ASC LIMIT ? OFFSET ?;";    
  // }
  // const values = [order, parseInt(limit), parseInt(offset)];
  // const data = await db.run_query(query, values);
  const query = "SELECT * FROM items;";
  const data = await db.run_query(query);
  return data;
}

//create a new item in the database
exports.add = async function add (item) {
  let query = "INSERT INTO items SET ?";
  let data = await db.run_query(query, item);
  return data;
}

//delete an item by its id
exports.delById = async function delById(id){
  let query = "DELETE FROM items WHERE id  = ?;";
  const values = [id];
  const data = await db.run_query(query,values);
  return data;
}

//update an existing item
exports.update = async function update(items) {
  const query = "UPDATE items SET ? WHERE id = ?;";
  const values = [items, items.id];
  const data = await db.run_query(query, values);
  return data;
}