const express = require('express');
const { saleController } = require('../controllers');
const validateSalesField = require('../middlewares/validateSalesField');

const router = express.Router();

router.post('/', validateSalesField, saleController.createSale);

module.exports = router;