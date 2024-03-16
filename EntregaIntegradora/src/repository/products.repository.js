//import { ProductsModel } from "../models/products.model.js";

export default class Product{
    
    constructor(dao) {
        this.dao = dao;
    }

    async getAll(){
        const products = await this.dao.get();
        return products;
    }
    
    async getById(id){
        const product = await this.dao.findOne(id);
        return product;
    }

    async saveProducts(product){
        const newProduct = await this.dao.create(product);
        return newProduct;
    }

    async updateProduct(id, product){
        const result = await this.dao.modify(id,product);
        return result;
    }

    async deleteProduct(id){
        const result = await this.dao.delete(id);
        return result;
    }
}