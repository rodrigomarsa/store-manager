const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await saleService.createSale(itemsSold);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};