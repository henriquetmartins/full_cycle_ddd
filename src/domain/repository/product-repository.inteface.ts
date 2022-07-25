import Product from "../entity/product";
import RepositoryInterface from "./repository.interface";

export default interface ProductRepositoryInterface<T> extends RepositoryInterface<Product> {
    
}