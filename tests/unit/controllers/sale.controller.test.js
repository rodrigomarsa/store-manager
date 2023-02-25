const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleList, createdSale } = require('./mocks/sale.controller.mock');
const { saleController } = require('../../../src/controllers');
const validateSalesField = require('../../../src/middlewares/validateSalesField');
const validationsInputValues = require('../../../src/services/validations/validationsInputValues');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando o controller de vendas', function () {
  describe('Listando vendas', function () {
    it('é chamado o status com o código 200 e a lista de vendas', async function () {
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: saleList });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.listSales(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(saleList);
    });

    it('é retornado o status com o código 422 e mensagem de erro', async function () {
      const invalidValueResponse = {
        type: 'INVALID_VALUE',
        message: '"id" must be a number',
      };
      sinon.stub(saleService, 'findAll').resolves(invalidValueResponse);
      const res = {};
      const req = { params: { id: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.listSales(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    });
  });

  describe('Busca de uma venda', function () {
    it('é retornado o status com o código 200 e o produto', async function () {
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: null, message: createdSale });
      
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(createdSale);
    });

    it('é retornado o status com o código 404 e mensagem de erro', async function () {
      const invalidValueResponse = {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      };
      sinon.stub(saleService, 'findById').resolves(invalidValueResponse);
      const res = {};
      const req = { params: { id: 8 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: invalidValueResponse.message,
      });
    });
  });

  describe('Cadastra uma nova venda', function () {
    it('é chamado o status com o código 201 e é chamado o json com a venda cadastrada', async function () {
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: null, message: createdSale });
      
      const res = {};
      const req = {
        body: [{
          "productId": 1,
          "quantity": 1
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith(createdSale);
    });

    it('é chamado o status com o código 404 e é chamado o json com a mensagem', async function () {
      sinon
        .stub(validationsInputValues, 'validateIds')
        .returns({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      const res = {};
      const req = {
        body: [{
          "productId": 999,
          "quantity": 1
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Verificando middleware validateSalesField', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar uma venda', function () {
    it('sem produto: é chamado o status com o código 400 e json com mensagem', async function () {
      const res = {};
      const req = {
        body: [{
          "quantity": 1
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateSalesField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('sem quantidade: é chamado o status com o código 400 e json com mensagem', async function () {
      const res = {};
      const req = {
        body: [{
          "productId": 1
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateSalesField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('quantidade igual a 0: é chamado o status com o código 422 e json com mensagem', async function () {
      const res = {};
      const req = {
        body: [{
          "productId": 1,
          "quantity": 0
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateSalesField(req, res);

      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('não deve chamar o próximo middleware', async function () {
      const res = {};
      const req = {
        body: [{
          "productId": 999,
          "quantity": 0
        }]
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateSalesField(req, res, next);
      expect(next).to.have.not.been.called;
    });
  });
});

  afterEach(function () {
    sinon.restore();
  });
});