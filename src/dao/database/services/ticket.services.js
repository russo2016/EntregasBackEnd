import {TicketsModel} from "../models/ticket.model.js";
import {ProductsModel} from "../models/products.model.js";
import CartsModel from "../models/carts.model.js";
import getLogger from "../../../utils/logger.js";

const logger = getLogger();

export default class Ticket {
    constructor() {
        console.log("Ticket Created");
    }
    async createTicket(req, res) {
        try {
            const user = req.session.user;
            if (!user || !user.email) {
                throw new Error("El usuario no existe o no fue encontrado");
            }
            const cartId = user.cart;
            if (!cartId) {
                throw new Error("ID de carrito no válido");
            }
            const cart = await CartsModel.findById(cartId);
            if (!cart) {
                throw new Error("El carrito no existe o no fue encontrado");
            }
            const products = cart.product;
            const noStockProducts = [];
                if (products.length > 0) {
                    for (const cartProduct of products) {
                        const product = await ProductsModel.findById(cartProduct.product);
                        if (!product) {
                            throw new Error("El producto no existe o no fue encontrado");
                        }
                        if (product.stock < cartProduct.quantity) {
                            noStockProducts.push({ product: product.title, quantity: cartProduct.quantity });
                            logger.warning("El producto "+ product.title +" no tiene suficiente stock");
                            await cart.updateOne({ $pull: { product: { product: product._id } } });
                        }
                        if (product.stock > 0){
                        product.stock -= cartProduct.quantity;
                        await product.save();
                        }
                    }
                    let totalPrice = 0;
                    const result = await CartsModel.findById(cartId).populate("product.product").lean();
                    const productsPurchased = []
                    result.product.forEach(item => {
                        totalPrice += item.product.price * item.quantity;
                        productsPurchased.push({ product: item.product.title, quantity: item.quantity });
                    });
                    const newTicket = {
                        purchaser: user.email,
                        code: Math.random().toString(36).substr(2, 9),
                        purchase_datetime: new Date(),
                        amount: totalPrice,
                        products: productsPurchased,
                    };
                    
                    if (noStockProducts.length > 0) {
                        newTicket.noStockProducts = noStockProducts;
                    }

                    await TicketsModel.create(newTicket);
                    await cart.updateOne({ $set: { product: [] } });
                    return newTicket;
                }
                else{
                    res.status(400).json({ error: "El carrito esta vacío" });        
                }
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await TicketsModel.findById(id);
            if (!ticket) {
                throw new Error("El ticket no existe o no fue encontrado");
            }
            return ticket;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}
