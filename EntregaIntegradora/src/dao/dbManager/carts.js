import { CartsModel } from "../models/carts.js";

export default class Cart {
    constructor() {
        console.log("Cart DAO created");
    }

    async getAll() {
        const carts = await CartsModel.find().lean();
        return carts;
    }

    async getById(id) {
        const cart = await CartsModel.findById(id).lean();
        return cart;
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getById(cid);
            const { product } = cart; // Nota el cambio aquí
    
            const productIndex = product.findIndex(
                (item) => item.product.toString() === pid // Asegurarse de que pid sea del mismo tipo que el _id en MongoDB
            );
    
            if (productIndex !== -1) {
                product[productIndex].quantity++;
            } else {
                product.push({
                    product: pid,
                    quantity: 1,
                });
            }
    
            await this.updateCart(cid,cart);
            return cart;
        } catch (err) {
            console.log(err);
        }
    };
    
    async saveCart(cart) {
        const newCart = new CartsModel(cart);
        let result = await newCart.save();
        return result;
    }

    async updateCart(id, cart) {
        const result = await CartsModel.updateOne({ _id: id }, cart);
        return result;
    }

    async deleteCart(id) {
        const result = await CartsModel.deleteOne({ _id: id });
        return result;
    }
}