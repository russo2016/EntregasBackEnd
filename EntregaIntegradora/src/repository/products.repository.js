import getLogger from "../utils/logger.js";

const logger = getLogger();

export default class Product {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            const products = await this.dao.get();
            return products;
        } catch (error) {
            logger.error('Error al obtener todos los productos:', error);
            throw error;
        }
    }
    
    async getById(id) {
        try {
            const product = await this.dao.findOne(id);
            return product;
        } catch (error) {
            logger.error(`Error al obtener el producto con el ID ${id}:`, error);
            throw error;
        }
    }

    async saveProduct(product) {
        try {
            const newProduct = await this.dao.create(product);
            return newProduct;
        } catch (error) {
            logger.error('Error al guardar el producto:', error);
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            const result = await this.dao.modify(id, product);
            return result;
        } catch (error) {
            logger.error(`Error al actualizar el producto con el ID ${id}:`, error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const result = await this.dao.delete(id);
            return result;
        } catch (error) {
            logger.error(`Error al eliminar el producto con el ID ${id}:`, error);
            throw error;
        }
    }
}
