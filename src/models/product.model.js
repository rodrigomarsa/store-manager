const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?);',
    [product.name],
  );
  return insertId;
};

const updateById = async (productId, productName) => {
  const result = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [productName, productId],
  );
  return result;
};

const remove = async (productId) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  remove,
};