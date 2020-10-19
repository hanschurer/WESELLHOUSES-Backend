const {Validator, ValidationError} = require('jsonschema');

const itemsSchema = require('../schemas/items.json');
const usersSchema = require('../schemas/users.json');

const makeKoaValidator = (schema, resource) => {

  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };
  
  const handler = async (ctx, next) => {

    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.body = {message: error.stack};
        ctx.status = 400;      
      } else {
        throw error;
      }
    }
  }
  return handler;
}

exports.validateItem= makeKoaValidator(itemsSchema, 'item');
exports.validateUser = makeKoaValidator(usersSchema, 'user');