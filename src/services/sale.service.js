const { saleModel, saleProductModel } = require('../models');
const validationsInputValues = require('./validations/validationsInputValues');

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
  createSale,
};