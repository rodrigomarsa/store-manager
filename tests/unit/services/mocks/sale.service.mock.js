const allSales = [
  {
    "saleId": 1,
    "date": "2023-02-17T19:56:52.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-17T19:56:52.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const createSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const createdSale = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    }
  ]
};

module.exports = {
  allSales,
  createSale,
  createdSale,
};