export default class Address {
    _street: string
    _number: number
    _zip: string
    _city: string

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street
        this._number = number
        this._zip = zip
        this._city = city
    }

    
    public get street() : string {
        return this._street
    }

    public get number() : number {
        return this._number
    }
    
    public get zipcode() : string {
        return this._zip
    }

    public get city() : string {
        return this._city
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._city}. CEP ${this._zip}`
    }
}