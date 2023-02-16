const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    s.id AS 'saleId',
    s.date,
    sa.product_id AS 'productId',
    sa.quantity
FROM
    StoreManager.sales AS s
        INNER JOIN
    StoreManager.sales_products AS sa ON s.id = sa.sale_id
ORDER BY id , product_id;`,
  );
  return result;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT 
    s.date, sa.product_id AS 'productId', sa.quantity
FROM
    StoreManager.sales AS s
        INNER JOIN
    StoreManager.sales_products AS sa ON s.id = sa.sale_id
WHERE
    s.id = ?;`,
    [saleId],
  );
  return sale;
};

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};