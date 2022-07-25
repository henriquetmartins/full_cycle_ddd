import Address from "./address"
import Customer from "./customer"

describe("Customer unit tests", () => {
      
    it('should throw error when id is empty', () => {
        expect(() => {
            const customer = new Customer('', 'Josefaldo')
        }).toThrowError('Id is required')
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            const custom = new Customer('1', '')
        }).toThrowError('Name is required')
    })

    it('should change name', () => {
        const customer = new Customer('2', 'Josefa')
        customer.changeName('Jamie')

        expect(customer.name).toBe('Jamie')
    })


    it('should activate customer', () => {
        const customer = new Customer('1', 'Jeremiah')
        const address = new Address('rua 1', 20, '3030', 'SP')

        customer.address = address  

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it('should throw error when try activate customer without address', () => {
        expect(() => {
            const customer = new Customer('1', 'Jeremiah')
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")

    })

    it('should deactivate customer', () => {
        const customer = new Customer('1', 'Jeremiah')

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it('should add reward points', () => {
        const customer = new Customer('1', 'Richard')
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
})