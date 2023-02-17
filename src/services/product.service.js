const { productModel } = require('../models');
const validationsInputValues = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();

  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = await validationsInputValues.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = validationsInputValues.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const editProduct = async ({ id, name }) => {
  const error = await validationsInputValues.validateId(id);
  if (error.type) return error;

  await productModel.updateById(id, name);
  const editedProduct = await productModel.findById(id);

  return { type: null, message: editedProduct };
};

const deleteProduct = async (id) => {
  const error = await validationsInputValues.validateId(id);
  if (error.type) return error;

  await productModel.remove(id);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editProduct,
  deleteProduct,
};