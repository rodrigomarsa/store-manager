const { productModel } = require('../models');
const validationsInputValues = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validationsInputValues.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (name) => {
  const error = validationsInputValues.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};