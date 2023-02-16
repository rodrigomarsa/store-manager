const connection = require('./connection');

const findById = async (saleId) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
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
  findById,
  insert,
};