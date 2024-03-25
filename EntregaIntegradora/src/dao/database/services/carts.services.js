import getLogger from "../../../utils/logger";

const logger = getLogger();
export default class Cart {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            const carts = await this.dao.find().lean();
            return carts;
        } catch (error) {
            logger.error('Error al obtener todos los carritos:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const cart = await this.dao.findById(id).lean();
            return cart;
        } catch (error) {
            logger.error(`Error al obtener el carrito con el ID ${id}:`, error);
            throw error;
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getById(cid);
            const { product } = cart;

            const productIndex = product.findIndex(
                (item) => item.product.toString() === pid
            );

            if (productIndex !== -1) {
                product[productIndex].quantity++;
            } else {
                product.push({
                    product: pid,
                    quantity: 1,
                });
            }

            await this.updateCart(cid, cart);
            return cart;
        } catch (error) {
            logger.error('Error al agregar un producto al carrito:', error);
            throw error;
        }
    };

    async updateProductFromCart(cid, pid, quantity) {
        try {
            const cart = await this.dao.updateOne(
                { _id: cid, "product.product": pid },
                { $set: { "product.$.quantity": quantity } }
            );
            return cart;
        } catch (error) {
            logger.error(`Error al actualizar el producto del carrito (${pid}) del carrito (${cid}):`, error);
            throw error;
        }
    }

    async saveCart(cart) {
        try {
            const newCart = new this.dao(cart);
            let result = await newCart.save();
            return result;
        } catch (error) {
            logger.error('Error al guardar el carrito:', error);
            throw error;
        }
    }

    async updateCart(id, cart) {
        try {
            const result = await this.dao.updateOne({ _id: id }, cart);
            return result;
        } catch (error) {
            logger.error(`Error al actualizar el carrito con el ID ${id}:`, error);
            throw error;
        }
    }

    async deleteProductsFromCart(id) {
        try {
            const cart = await this.dao.findById(id);
            if (!cart) {
                return { error: 'Carrito no encontrado' };
            }
            cart.product = [];
            const result = await cart.save();

            return result;
        } catch (error) {
            logger.error('Error al eliminar elementos del carrito:', error);
            throw error;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await this.dao.findById(cid);

            if (!cart) {
                return { success:false, message: 'Carrito no encontrado' };
            }
            const productIndex = cart.product.findIndex(
                (product) => product.product.toString() === pid
            );

            if (productIndex !== -1){
                cart.product.splice(productIndex, 1);
                await cart.save();

                return { success:true, message: 'Producto eliminado del carrito' };
            } else{
                return { success:false, message: 'Producto no encontrado en el carrito' };
            }
        } catch (error) {
            logger.error('Error al eliminar el producto del carrito:', error);
            throw error;
        }
    }
}
