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
  const product = connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [productName, productId],
  );
  return product;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};