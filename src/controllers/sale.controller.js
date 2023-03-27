const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await saleService.createSale(itemsSold);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const itemsSold = req.body;
  const { type, message } = await saleService.editSale(id, itemsSold);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  listSales,
  getSale,
  createSale,
  editSale,
  deleteSale,
};