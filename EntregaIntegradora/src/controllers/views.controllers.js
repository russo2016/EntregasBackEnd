import Product from "../dao/database/services/products.services.js";
import Message from "../dao/database/services/messages.services.js";
import Cart from "../dao/database/services/carts.services.js";
import { ProductsModel } from "../dao/database/models/products.model.js";
import { CartsModel } from "../dao/database/models/carts.model.js";
import passport from "passport";

export const getProducts = async (req, res) => {
    const product = new Product();
    try {
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
            products,
            hasNextPage,
            hasPrevPage,
            nextPage,
            prevPage,
            totalPages,
            style: "css/products.css"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};


export const getMessages = async (req, res) => {
    const messages = new Message();
    const result = await messages.getAll();
    try {
        res.status(200).render("messages", {
            title: "Listado de mensajes",
            messages: result,
            style: "css/messages.css"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    const cart = new Cart();
    const result = await CartsModel.findById(id).populate("product.product").lean();
    try {
        res.status(200).render("carts", {
            title: "Carrito",
            products: result.product,
            style: "../css/carts.css"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const realtime = async (req, res) => {
    res.render("realtimeProducts", {
        title: "Chat en tiempo real",
    });
};
