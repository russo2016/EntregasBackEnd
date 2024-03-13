import ProductsDTO from '../dao/dto/productsDTO.js';

export default class ProductsRepository{
    constructor(productsDAO){
        this.productsDAO = productsDAO;
    }

    async getProducts(){
        const products = await this.productsDAO.getProducts();
        return products;
    }

    async getProduct(id){
        const product = await this.productsDAO.getProduct(id);
        return product;
    }

    async saveProduct(product){
        const newProduct = await ProductsDTO(product);
        const response = await this.productsDAO.saveProduct(newProduct);
        return response;
    }

    async updateProduct(id, product){
        const newProduct = await ProductsDTO(product);
        const response = await this.productsDAO.updateProduct(id, newProduct);
        return response;
    }

    async deleteProduct(id){
        const response = await this.productsDAO.deleteProduct(id);
        return response;
    }
};