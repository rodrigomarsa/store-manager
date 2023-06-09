const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const validationsInputValues = require('../../../src/services/validations/validationsInputValues');
const { allProducts, createdProduct, editedProduct } = require('./mocks/product.service.mock');

describe('Verificando service produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      // act
      const result = await productService.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });

    it('a lista de produtos é um array', async function () {
      // ARRANGE
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      // ACT - chamar a função `findAll`
      const result = await productService.findAll();
      // ASSERT - verificar se resultado é um array
       expect(result.message instanceof Array).to.equal(true);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
      // act
      const result = await productService.findById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    
    it('retorna um erro caso receba um ID inexistente', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(undefined);
      // act
      const result = await productService.findById(8);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      // act
      const result = await productService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });
  
  describe('Cadastrando um novo produto', function () {
    it('retorna o produto cadastrado e não retorna erro', async function () {
      sinon.stub(productModel, 'insert').resolves(10);
      sinon.stub(productModel, 'findById').resolves(createdProduct);

      const response = await productService.createProduct('Óculos do Stan Lee');
      
      expect(response.message).to.deep.equal({ id: 10, name: 'Óculos do Stan Lee' });
      expect(response.type).to.equal(null);
    });

    it('retorna um erro caso receba um nome inválido', async function () {
      // arrange
      sinon.stub(validationsInputValues, 'validateNewProduct')
        .returns({ type: 'INVALID_VALUE', message: '"name" is required' });
      // act
      const result = await productService.createProduct(null);
      // assert
      expect(result.type).to.be.equals('INVALID_VALUE');
      expect(result.message).to.be.equals('"name" is required');
    });
  });

  describe('Editando um produto', function () {
    it('retorna o produto editado e não retorna erro', async function () {
      sinon.stub(productModel, 'updateById').resolves(undefined);
      sinon.stub(productModel, 'findById').resolves(editedProduct);
      
      const response = await productService.editProduct({ id: 1, name: 'Traje do Homem Formiga' });

      expect(response.message).to.deep.equal(editedProduct);
      expect(response.type).to.equal(null);
    });

     it('retorna um erro caso receba um ID inválido', async function () {
      sinon.stub(validationsInputValues, 'validateId')
        .returns({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      const result = await productService.editProduct({ id: 'a', name: 'Traje do Homem Formiga' });

      expect(result.type).to.be.equals('INVALID_VALUE');
      expect(result.message).to.be.equals('"id" must be a number');
    });
  });

  describe('Excluindo um produto', function () {
    it('exclui o produto e não retorna erro', async function () {
      sinon.stub(productModel, 'findById').resolves(editedProduct);
      sinon.stub(productModel, 'remove').resolves(undefined);

      const response = await productService.deleteProduct(1);

      expect(response.message).to.deep.equal('');
      expect(response.type).to.equal(null);
    });

     it('retorna um erro caso receba um ID inválido', async function () {
      sinon.stub(validationsInputValues, 'validateId')
        .returns({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

       const result = await productService.deleteProduct(999);

      expect(result.type).to.be.equals('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equals('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
   });
 });