import {ProductService} from "../repository/index.js";
import {MessageService} from "../repository/index.js";
import {cartService} from "../repository/index.js";
import { ProductsModel } from "../dao/database/models/products.model.js";
import  CartsModel  from "../dao/database/models/carts.model.js";
import getLogger from "../utils/logger.js";

const logger = getLogger();

export const getProducts = async (req, res) => {
    const product = ProductService;
    try {
        let cart = await cartService.getById(req.session.user.cart);
        let cartItemCount = 0;
        if (cart) {
            cartItemCount = cart.product.length;
        }
        const { limit, page, query, sort } = req.query;
        const parsedQuery = () => {
            if (query) {
                return JSON.parse(query);
            }
            return {};
        };
        const isSorted = () => {
            if (sort) {
                if (sort === "asc") {
                    return 1;
                } else if (sort === "desc") {
                    return -1;
                }
            } else {
                return null;
            }
        };
        const productsData = await ProductsModel.paginate(
            parsedQuery(),
            {
                limit: limit || 12,
                page: page || 1,
                sort: sort ? { price: isSorted() } : null,
                lean: true
            }
        );
    
        const { docs, hasNextPage, hasPrevPage, nextPage, prevPage, totalPages } = productsData;
        const products = docs;

        res.status(200).render("products", {
            title: "Listado de productos",
            products : products,
            cartItemCount: cartItemCount,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            totalPages,
            style: "css/products.css"
        });
    } catch (error) {
        logger.error(error);
    }
};


export const getMessages = async (req, res) => {
    const messages = MessageService;
    const result = await messages.getAll();
    try {
        res.status(200).render("messages", {
            title: "Listado de mensajes",
            messages: result,
            style: "css/messages.css"
        });
    } catch (error) {
        logger.error(error);
    }
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    const cart = cartService;
    const result = await CartsModel.findById(id).populate("product.product").lean();
    let totalPrice = 0;
        result.product.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });
    try {
        res.status(200).render("carts", {
            title: "Carrito",
            products: result.product,
            totalPrice: totalPrice,
            style: "../css/carts.css"
        });
    } catch (error) {
        logger.error(error);
    }
};

export const realtime = async (req, res) => {
    res.render("realtimeProducts", {
        title: "Chat en tiempo real",
        style: "/css/realtime.css"
    });
};
