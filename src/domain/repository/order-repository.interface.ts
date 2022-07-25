import Order from "../entity/order"
import RepositoryInterface from "./repository.interface"

export default interface OrderRepositoryInterface<T> extends RepositoryInterface<Order>{
    delete(id: string): Promise<void>
    findAllFromCustomer(customerId: string): Promise<T[]>
}