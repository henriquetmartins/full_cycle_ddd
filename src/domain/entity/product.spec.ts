import Product from "./product"

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product("", "Product 1", 100)
        }).toThrowError('Id is required')
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product("1", "", 100)
        }).toThrowError('Name is required')
    })

    it('should throw error when price is less than or eql to zero', () => {
        expect(() => {
            const product = new Product("1", "product 1", 0)
        }).toThrowError('Price must be greater then zero')
    })

    it('should change name', () => {
            const product = new Product("1", "product 1", 5)
            product.changeName('Product Update')
            expect(product.name).toBe('Product Update')
    })

    it('should throw error when change to empty name', () => {
        const product = new Product("1", "product 1", 5)
        expect(() => {
            product.changeName('')
        }).toThrowError('Name is required')
    })

    it('should change price', () => {
        const product = new Product("1", "product 1", 5)
        product.changePrice(150)
        expect(product.price).toBe(150)
    })

    it('should throw error when change price to less than or eql zero', () => {
        const product = new Product("1", "product 1", 5)
        expect(() => {
            product.changePrice(-1)
        }).toThrowError('Price must be greater then zero')
    })
})