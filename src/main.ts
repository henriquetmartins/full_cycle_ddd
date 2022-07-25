import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order-items";

let customer = new Customer('1', 'Josefaldo')
const address = new Address('rua 1', 123, '112323', 'SP')
customer.address = address
customer.activate()

const item1 = new OrderItem('1', 'produto1', 10, 'p1', 1)
const item2 = new OrderItem('2', 'produto2', 15, 'p2', 2)
const order = new Order('1', '1', [item1, item2])