const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productList } = require('./mocks/product.controller.mock');
const { productController } = require('../../../src/controllers');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando controller produtos', function () {
  describe('Listando produtos', function () {
    it('é chamado o status com o código 200 e a lista de produtos', async function () {
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: productList });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.listProducts(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });

    it('é retornado o status com o código 404 e mensagem de erro', async function () {
      const invalidValueResponse = {
        type: 'INVALID_VALUE',
        message: '"id" must be a number',
      };
      sinon.stub(productService, 'findAll').resolves(invalidValueResponse);
      const res = {};
      const req = { params: { id: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.listProducts(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: invalidValueResponse.message,
      });
    });
  });

  describe('Busca de um produto', function () {
    it('é retornado o status com o código 200 e o produto', async function () {
      sinon
        .stub(productService, 'findById')
        .resolves({ type: null, message: productList });
      
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProduct(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({ message: productList });
    });

    it('é retornado o status com o código 404 e mensagem de erro', async function () {
      const invalidValueResponse = {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      };
      sinon.stub(productService, 'findById').resolves(invalidValueResponse);
      const res = {};
      const req = { params: { id: 8 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: invalidValueResponse.message,
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});