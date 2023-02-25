const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel, saleProductModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const validationsInputValues = require('../../../src/services/validations/validationsInputValues');
const { allSales, createSale, createdSale } = require('./mocks/sale.service.mock');

describe('Verificando o service de vendas', function () {
  describe('listagem de vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      // arrange
      sinon.stub(saleModel, 'findAll').resolves(allSales);
      // act
      const result = await saleService.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });

    it('a lista de vendas é um array', async function () {
      // ARRANGE
      sinon.stub(saleModel, 'findAll').resolves(allSales);
      // ACT - chamar a função `findAll`
      const result = await saleService.findAll();
      // ASSERT - verificar se resultado é um array
       expect(result.message instanceof Array).to.equal(true);
    });
  });

  describe('busca de uma venda', function () {
    it('retorna um erro caso receba um ID inexistente', async function () {
      // arrange
      sinon.stub(saleModel, 'findById')
        .returns({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });;
      // act
      const result = await saleService.findById(null);
      // assert
      expect(result.type).to.be.equals('SALE_NOT_FOUND');
      expect(result.message).to.be.equals('Sale not found');
    });

    it('retorna a venda caso ID existente', async function () {
      // arrange
      sinon.stub(saleModel, 'findById').resolves([allSales[0]]);
      // act
      const result = await saleService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([allSales[0]]);
    });
  });
  
  describe('Cadastrando uma nova venda', function () {
    it('retorna a venda cadastrada e não retorna erro', async function () {
      sinon.stub(saleModel, 'insert').resolves(1);
      sinon.stub(saleProductModel, 'insert').resolves({
        "productId": 1,
        "quantity": 1
      });
      sinon.stub(validationsInputValues, 'validateIds')
        .returns({ type: null, message: '' });
      
      const response = await saleService.createSale([createSale[0]]);
      
      expect(response.type).to.equal(null);
      expect(response.message).to.deep.equal(createdSale);
    });

    it('retorna um erro caso receba uma venda inválida', async function () {
      // arrange
      sinon.stub(validationsInputValues, 'validateIds')
        .returns({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      const result = await saleService.createSale(null);
      // assert
      expect(result.type).to.be.equals('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equals('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
   });
 });