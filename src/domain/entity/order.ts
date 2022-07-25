import OrderItem from "./order-items"

export default class Order {
    private _id: string
    private _customerId: string
    private _items: OrderItem[] = []
    private _total: number

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.total()
        this.validate()
    }

    validate(): boolean {
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }

        if(this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if(this._items.length === 0) {
            throw new Error("Items qnt must be greater than 0");
        }

        if(this._items.some(item => item.quantity <= 0)) {
                throw new Error("Items quantity must be greater than zero");
        }

        return true
    }

    
    public get items() : OrderItem[] {
        return this._items
    }
    
    
    public get id() : string {
        return this._id
    }

    
    public get customerId() : string {
        return this._customerId
    }

    removeItem(id: string): void {
        if(this.items.length <= 1) {
            throw new Error("Items quantity must be greather than zero, remove failed")
        }

        const itemIndex = this.items.findIndex(item => item.id === id)
        if(itemIndex === -1){ throw new Error('Item not found')}
        this._items.splice(itemIndex, 1)
    }

    addItem(item: OrderItem){
        if(item.quantity <= 0) {
            throw new Error("Items quantity must be greater than zero");
        }

        this.items.push(item)
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0)
    }
}