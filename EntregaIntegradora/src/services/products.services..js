import { ProductsModel } from "../models/products.model.js";

export default class Product{
    
    constructor(){
        console.log("Product DAO created");
    }

    async getAll(){
        const products = await ProductsModel.find().lean();
        return products;
    }
    
    async getById(id){
        const product = await ProductsModel.findById(id).lean();
        return product;
    }

    async saveProducts(product){
        const newProduct = new ProductsModel(product);
        let result = await newProduct.save();
        return result;
    }

    async updateProduct(id, product){
        const result = await ProductsModel.updateOne({_id:id},product);
        return result;
    }

    async deleteProduct(id){
        const result = await ProductsModel.deleteOne({_id:id});
        return result;
    }
}