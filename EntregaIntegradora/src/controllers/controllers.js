import Product from "../services/products.services.js";
import Message from "../services/messages.services.js";
import Cart from "../services/carts.services.js";
import { ProductsModel } from "../models/products.model.js";
import { CartsModel } from "../models/carts.model.js";
import UserModel  from "../models/user.model.js";
import auth from "../middlewares/auth.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

export const getSignupPage = async (req, res) => {
    try {
        res.render("signup", {
            title: "Regístrese",
            style: "css/signup.css"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getLoginPage = async (req, res) => {
    try {
        res.render("login", {
            title: "Inicie sesión",
            style: "css/login.css"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

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

export const signup = async (req, res) => {
    try {
        passport.authenticate("register", (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message, success: false });
            }
            if (!user) {
                return res.status(400).json({ error: info.message, success: false });
            }
            return res.status(200).json({ message: "Usuario creado con éxito", success: true });
        })(req, res);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message, success: false });
        }
        if (!user) {
            return res.status(400).json({ error: info.message, success: false });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message, success: false });
            }
            req.session.user = req.user;
            return res.status(200).json({ message: "Inicio de sesión exitoso", success: true });
        });
    })(req, res, next);
};


export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
            } else {
                res.json({ success: true, message: 'Sesión cerrada correctamente' });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCurrentSession = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "No hay una sesión activa" });
    } else {
        const session = {
            message: "Sesión activa",
            user: req.user,
        };
        res.status(200).json(session);
    }
};

