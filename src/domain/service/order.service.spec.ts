import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order-items"
import OrderService from "./order.service"

describe('Order services unit tests', () => {
    it('should return all orders price', () => {
        const item1 = new OrderItem('1', 'item 1', 10, '1', 1)
        const item2 = new OrderItem('2', 'item 2', 20, '12', 1)
        const item3 = new OrderItem('3', 'item 3', 50, '13', 1)
        const order1 = new Order('1', '1', [item1, item2])
        const order2 = new Order('2', '2', [item2, item3])
        const orders = [order1, order2]
        
        const total = OrderService.countPrice(orders)

        expect(total).toBe(100)
    })

    it('should place an order', () => {
        const customer = new Customer('1', 'Customer 1')
        const item1 = new OrderItem('1', 'item 1', 10, 'p1', 1)

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })
})