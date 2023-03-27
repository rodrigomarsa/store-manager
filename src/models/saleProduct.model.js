const connection = require('./connection');

const insert = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  return { productId, quantity };
};

const update = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [quantity, productId, saleId],
  );
  return { productId, quantity };
};

module.exports = {
  insert,
  update,
};