const productList = [
  {
    "id": 1,
    "name": "Teia do Homem Aranha"
  },
  {
    "id": 2,
    "name": "Nave dos Guardiões da Galáxia"
  },
  {
    "id": 3,
    "name": "Espada do Thanos"
  },
];

const createdProduct = { id: 10, name: 'Óculos do Stan Lee' };

const editedProduct = { id: 1, name: 'Traje do Homem Formiga' };

const invalidValueResponse = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

module.exports = {
  productList,
  createdProduct,
  editedProduct,
  invalidValueResponse,
};