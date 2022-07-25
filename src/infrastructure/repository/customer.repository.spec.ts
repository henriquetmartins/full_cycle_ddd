import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"

describe('Customer Repository test', () => {
    let sequelize: Sequelize

    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })


    afterEach(async () => {
        await sequelize.close()
    })

    it('should create customer', async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('rua 1', 1, '56465', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const customerModel = await CustomerModel.findOne({ where: {id: customer.id}})


        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city
        })
    })

    it('should update customer', async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('rua 1', 1, '56465', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const address2 = new Address('rua 2', 2, '56465', 'SP')
        customer.changeName('Customer Updated')
        customer.changeAddress(address2)

        await customerRepository.update(customer)
        const customerModel = await CustomerModel.findOne({ where: {id: customer.id}})

        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer Updated',
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address2.street,
            number: address2.number,
            zipcode: address2.zipcode,
            city: address2.city
        })
    })

    it('should return all customers', async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('rua 1', 1, '56465', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customer2 = new Customer('2', 'Customer 2')
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const customersList = await customerRepository.findAll()
        expect(customersList).toHaveLength(2)
        expect(customersList).toContainEqual(customer)
        expect(customersList).toContainEqual(customer2)
    })

    it('should find an customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('rua 1', 1, '56465', 'SP')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customerResult = await customerRepository.find(customer.id)

        expect(customer).toStrictEqual(customerResult)
    })

    it('should throw error when customer is not found', async() => {
        const customerRepository = new CustomerRepository()
        
        expect(async() => {
            await customerRepository.find('1')
        }).rejects.toThrowError('Customer not found')
    })

})
