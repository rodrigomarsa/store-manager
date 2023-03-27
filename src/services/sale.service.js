const { saleModel, saleProductModel } = require('../models');
const validationsInputValues = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = await validationsInputValues.validateSaleId(saleId);
  if (error.type) return error;

  const sale = await saleModel.findById(saleId);

  return { type: null, message: sale };
};

const createSale = async (itemsSold) => {
  const error = await validationsInputValues.validateIds(itemsSold);
  if (error.type) return error;

  const newSaleId = await saleModel.insert();

  const newSaleProduct = await Promise.all(itemsSold
    .map(async ({ productId, quantity }) => saleProductModel
      .insert({ saleId: newSaleId, productId, quantity })));
  
  const saleProductItems = { id: newSaleId, itemsSold: newSaleProduct };
  
  return { type: null, message: saleProductItems };
};

const editSale = async (saleId, itemsSold) => {
  const errorSale = await validationsInputValues.validateSaleId(saleId);
  if (errorSale.type) return errorSale;

  const errorProducts = await validationsInputValues.validateIds(itemsSold);
  if (errorProducts.type) return errorProducts;

  const itemsUpdated = await Promise.all(itemsSold
    .map(async ({ productId, quantity }) => saleProductModel
      .update({ saleId, productId, quantity })));
  
  const updatedProductItems = { saleId, itemsUpdated };
  
  return { type: null, message: updatedProductItems };
};

const deleteSale = async (id) => {
  const error = await validationsInputValues.validateSaleId(id);
  if (error.type) return error;

  await saleModel.remove(id);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createSale,
  editSale,
  deleteSale,
};