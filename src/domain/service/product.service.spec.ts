import Product from '../entity/product'
import ProductService from './product.service'

describe('Product service unit tests', () => {

    it('should change the prices of all products', () => {
        const product1 = new Product('1', 'product 1', 10)
        const product2 = new Product('2', 'product 2', 20)
        const products = [product1, product2]

        ProductService.increasePrice(products, 50)

        expect(product1.price).toBe(15)
        expect(product2.price).toBe(30)
    })
})