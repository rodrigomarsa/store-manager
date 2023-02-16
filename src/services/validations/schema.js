const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object().keys({
  name: Joi.string().min(5).required()
  .messages({
    'string.base': '{#key} tem que ser uma string',
  }),
});

module.exports = {
  idSchema,
  addProductSchema,
};