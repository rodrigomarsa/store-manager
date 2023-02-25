const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct, productUpdated } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 37 }]);
    // Act
    const result = await productModel.insert(newProduct);
    // Assert
    expect(result).to.equal(37);
  });
  
  it('Editando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productUpdated);

    const result = await productModel.updateById(1, "Martelo do Batman");

    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });
  
  afterEach(function () {
    sinon.restore();
  });

  it('Excluindo um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productUpdated);

    const result = await productModel.remove(1);

    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});