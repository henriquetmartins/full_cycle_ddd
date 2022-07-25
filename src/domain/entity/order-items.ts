export default class OrderItem {
    private _id: string
    private _name: string
    private _productId: string
    private _price: number 
    private _quantity: number

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id
        this._name = name
        this._price = price
        this._productId = productId
        this._quantity = quantity
        this.validate()
    }

    validate() {
        if(this._quantity <= 0) {
            throw new Error("Items quantity must be greater than zero");
        }
    }
    
    
    public get id() : string {
        return this._id
    }
    
    public get price() : number {
        return this._price * this._quantity
    }

    
    public get name() : string {
        return this._name
    }
    
    public get quantity() : number {
        return this._quantity
    }
    
    
    public get productId() : string {
        return this._productId
    }
    
}