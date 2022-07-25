import Order from "./order"
import OrderItem from "./order-items"

describe('Order unit tests', () => {
    it('should throw error when id is empty', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        expect(() => {
            let order = new Order('', '123', [item1])
        }).toThrowError("Id is required")
    })

    it('should throw error when customerId is empty', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        expect(() => {
            let order = new Order('1', '', [item1])
        }).toThrowError('CustomerId is required')
    })

    it('should throw error when items list are empty', () => {
        expect(() => {
            let order = new Order('1', '1', [])
        }).toThrowError('Items qnt must be greater than 0')
    })

    it('should calculate total', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        const item2 = new OrderItem('2', 'item 2', 50, "p2", 2)

        const order = new Order('1', '1', [item1, item2])

        const total = order.total()

        expect(total).toBe(120)
    })

    it('should remove an item', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        const item2 = new OrderItem('2', 'item 2', 50, "p2", 2)

        const order = new Order('1', '1', [item1, item2])
        order.removeItem('1')
        expect(order.items.length).toEqual(1)
    })

    it('should add an item', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        const item2 = new OrderItem('2', 'item 2', 50, "p2", 2)

        const order = new Order('1', '1', [item1])
        order.addItem(item2)

        expect(order.items).toHaveLength(2)
    })

    it('should throw error when clean items list', () => {
        const item1 = new OrderItem('1', 'item 1', 10, "p1", 2)
        const order = new Order('1', '1', [item1])

        expect(() => {
            order.removeItem(item1.id)
        }).toThrowError('Items quantity must be greather than zero, remove failed')
    })
})