const express = require('express');
const { productController } = require('../controllers');
const validateProductNameField = require('../middlewares/validateProductNameField');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

router.post('/', validateProductNameField, productController.createProduct);

router.put('/:id', validateProductNameField, productController.editProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;