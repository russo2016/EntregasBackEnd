
export default class Product{
    
    constructor(dao) {
        this.dao = dao;
    }

    async getAll(){
        const products = await this.dao.find().lean();
        return products;
    }
    
    async getById(id){
        const product = await this.dao.findById(id).lean();
        return product;
    }

    async saveProducts(product){
        const newProduct = new this.dao(product);
        let result = await newProduct.save();
        return result;
    }

    async updateProduct(id, product){
        const result = await this.dao.updateOne({_id:id},product);
        return result;
    }

    async deleteProduct(id){
        const result = await this.dao.deleteOne({_id:id});
        return result;
    }
}