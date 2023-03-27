const express = require('express');
const { saleController } = require('../controllers');
const validateSalesField = require('../middlewares/validateSalesField');

const router = express.Router();

router.get('/', saleController.listSales);

router.get('/:id', saleController.getSale);

router.post('/', validateSalesField, saleController.createSale);

router.put('/:id', validateSalesField, saleController.editSale);

router.delete('/:id', saleController.deleteSale);

module.exports = router;