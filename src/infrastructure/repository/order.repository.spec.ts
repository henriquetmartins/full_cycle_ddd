import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order-items"
import Product from "../../domain/entity/product"
import CustomerModel from "../db/sequelize/model/customer.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerRepository from "./customer.repository"
import OrderRepository from "./order.repository"
import ProductRepository from "./product.repository"

describe('Order Repository test', () => {
    let sequelize: Sequelize


    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Jhonny")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: product.id,
                    order_id: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price
                }
            ]
        })
    })

    it('should return all users order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customer2 = new Customer("2", "Customer 2")
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 1)
        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])
        const order2 = new Order('2', customer.id, [orderItem2])
        const customer2Order = new Order('3', customer2.id, [orderItem3])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        await orderRepository.create(order2)
        await orderRepository.create(customer2Order)

        const findAllOrdersFromUser = await orderRepository.findAllFromCustomer(customer.id)

        const orders = [order, order2]
        expect(findAllOrdersFromUser).toEqual(orders)
        
    })

    it('should return order by id', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customer2 = new Customer("2", "Customer 2")
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 1)
        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])
        const order2 = new Order('2', customer.id, [orderItem2])
        const customer2Order = new Order('3', customer2.id, [orderItem3])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        await orderRepository.create(order2)
        await orderRepository.create(customer2Order)

        const findOrder = await orderRepository.find(orderItem.id)

        expect(findOrder).toEqual(order)
    })

    it('should return all orders', async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customer2 = new Customer("2", "Customer 2")
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 1)
        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])
        const order2 = new Order('2', customer.id, [orderItem2])
        const customer2Order = new Order('3', customer2.id, [orderItem3])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        await orderRepository.create(order2)
        await orderRepository.create(customer2Order)

        const findAllOrders = await orderRepository.findAll()

        const orders = [order, order2, customer2Order]
        expect(findAllOrders).toEqual(orders)
    })

    it('should delete an order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)


        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        let allOrders = await orderRepository.findAllFromCustomer(customer.id)
        expect(allOrders).toHaveLength(1)
        await orderRepository.delete(order.id)

        allOrders = await orderRepository.findAllFromCustomer(customer.id)
        expect(allOrders).toHaveLength(0)
    })

    it.only('should update items from Order', async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1")
        const address = new Address('rua 1', 1, '123', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product('p1', 'produto 1', 10)
        await productRepository.create(product)

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 1)
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 1)
        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 1)

        const order = new Order('1', customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        order.addItem(orderItem2)
        order.addItem(orderItem3)
        order.removeItem(orderItem.id)
        
        await orderRepository.update(order)
        const findOrder = await orderRepository.find('1')
        const item1 = findOrder.items.find(item => item.id === '1')
        const item2 = findOrder.items.find(item => item.id === '2')
        const item3 = findOrder.items.find(item => item.id === '3')
       
        expect(item1).toBeUndefined()
        expect(item2).not.toBeUndefined()
        expect(item3).not.toBeUndefined()
    })

})