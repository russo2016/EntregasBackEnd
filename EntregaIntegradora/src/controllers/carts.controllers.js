import {cartService} from "../repository/index.js";
import Ticket from "../dao/database/services/ticket.services.js";

const cart = cartService;

export const getAllCarts = async (req, res) => {
    try {
        const response = await cart.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await cart.getById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createCart = async (req, res) => {
    const { timestamp, products } = req.body;
    try {
        const response = await cart.saveCart({ timestamp, product: products });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const response = await cart.addProductToCart(cid, pid);
        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error", data: error });
    }
};

export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const response = await cart.updateProductFromCart(cid, pid, quantity);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await cart.deleteProductsFromCart(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await cart.removeProductFromCart(cid, pid);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const purchase = async (req, res) => {
    const ticket = new Ticket();
    try {
        const response = await ticket.createTicket(req, res);
        if (response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};