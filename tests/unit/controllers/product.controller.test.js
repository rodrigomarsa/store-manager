const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productList, createdProduct } = require('./mocks/product.controller.mock');
const { productController } = require('../../../src/controllers');
const validateProductNameField = require('../../../src/middlewares/validateProductNameField');

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

    it('é retornado o status com o código 422 e mensagem de erro', async function () {
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
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('"id" must be a number');
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
      expect(res.json).to.have.been.calledWith(productList);
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

  describe('Cadastra um novo produto', function () {
    it('é chamado o status com o código 201 e é chamado o json com o produto cadastrado', async function () {
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: null, message: createdProduct });
      
      const res = {};
      const req = {
        body: {
          name: 'Óculos do Stan Lee',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    });
  });

  describe('Verificando middleware validateProductNameField', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar um produto', function () {
    it('sem nome: é chamado o status com o código 400 e json com mensagem', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('nome menor que 5 caracteres: é chamado o status com o código 422 e json com mensagem', async function () {
      const res = {};
      const req = {
        body: {
          name: 'ERRO',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res);

      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('não deve chamar o próximo middleware', async function () {
      const res = {};
      const req = {
        body: {},
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res, next);
      expect(next).to.have.not.been.called;
    });
  });
});

  afterEach(function () {
    sinon.restore();
  });
});