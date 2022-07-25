import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order-items";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface<Order> {

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        })

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                )
            })

            return new Order(orderModel.id, orderModel.customer_id, items)
        })

        return orders
    }


    async findAllFromCustomer(customerId: string): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            where: {
                customer_id: customerId
            },
            include: ["items"]
        })

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                )
            })
            return new Order(orderModel.id, orderModel.customer_id, items)
        })
        return orders
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {
                id: id
            },
            include: ["items"]
        })

        const items = orderModel.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            )
        })
        return new Order(orderModel.id, orderModel.customer_id, items)
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
            {
                include: [{ model: OrderItemModel }]
            })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.destroy({where: { id: entity.id}})
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
            {
                include: [{ model: OrderItemModel }]
            })
    }

    async delete(id: string): Promise<void> {
        await OrderModel.destroy({where: {id: id}})
    }
}