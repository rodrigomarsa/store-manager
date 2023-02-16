const { productModel } = require('../../models');
const { idSchema, addProductSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateNewProduct = async (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateProductId = async (itemsSold) => {
  const product = await Promise.all(
    itemsSold.map(({ productId }) => productModel.findById(productId)),
  );
  if (product.some((productId) => productId === undefined)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateProductId,
};