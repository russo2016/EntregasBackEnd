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