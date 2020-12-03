const db = require('../helpers/database');


exports.getAll = async function getAll (page, limit, order) {
    const query = "SELECT * FROM messages;";
    const data = await db.run_query(query);
    return data;
  }

exports.getById = async function getById (id) {
    let query = "SELECT * FROM messages WHERE id = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
  }
  
//create a new item in the database
exports.add = async function add (message) {
    let query = "INSERT INTO messages SET ?";
    let data = await db.run_query(query, message);
    return data;
  }
  
  //delete an item by its id
  exports.delById = async function delById(id){
    let query = "DELETE FROM messages WHERE id  = ?;";
    const values = [id];
    const data = await db.run_query(query,values);
    return data;
  }

  //update an existing item
exports.update = async function update(message) {
    const query = "UPDATE messages SET ? WHERE id  = ?;";
    const values = [message, message.id];
    const data = await db.run_query(query, values);
    return data;
  }