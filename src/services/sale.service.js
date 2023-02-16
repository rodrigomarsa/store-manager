const { saleModel, saleProductModel } = require('../models');
const validationsInputValues = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length > 0) return { type: null, message: sale };

  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const createSale = async (itemsSold) => {
  const error = await validationsInputValues.validateProductId(itemsSold);
  if (error.type) return error;

  const newSaleId = await saleModel.insert();

  const newSaleProduct = await Promise.all(itemsSold
    .map(async ({ productId, quantity }) => saleProductModel
      .insert({ saleId: newSaleId, productId, quantity })));
  
  const saleProductItems = { id: newSaleId, itemsSold: newSaleProduct };
  
  return { type: null, message: saleProductItems };
};

module.exports = {
  findAll,
  findById,
  createSale,
};