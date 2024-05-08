import { cartService } from "../repository/index.js";
import Ticket from "../dao/database/services/ticket.services.js";
import EErrors from "../errorTools/enum.js";
import { generateCartErrorInfo } from "../errorTools/info.js";
import CustomError from "../errorTools/customError.js";
import { ProductService } from "../repository/index.js";
import getLogger from "../utils/logger.js";

const cart = cartService;
const Product = ProductService;
const logger = getLogger();

export const getAllCarts = async (req, res) => {
    try {
        const response = await cart.getAll();
        res.status(200).json(response);
        logger.debug('Todos los carritos se recuperaron correctamente');
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await cart.getById(id);
        res.status(200).json(response);
        logger.debug(`El carrito con ID ${id} se recuperó correctamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const createCart = async (req, res) => {
    const { timestamp, products } = req.body;
    try {
        const response = await cart.saveCart({ timestamp, product: products });
        res.status(200).json(response);
        logger.debug('El carrito se creó correctamente');
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const productExists = await Product.getById(pid);
        if (productExists) {
            if (req.session.user){
            if (req.session.user.role === "premium") {
                if(productExists.owner !== req.session.user.email){
                    const response = await cart.addProductToCart(cid, pid);
                    res.status(200).json({ message: "success", data: response });
                    logger.debug(`El producto con ID ${pid} se agregó al carrito con ID ${cid}`);
                }else{
                    res.status(403).json({ message: "No puede agregar productos propios al carrito", data: null });
                    logger.error(`El producto con ID ${pid} no se puede agregar al carrito con ID ${cid}`);
                }
            }else{
                const response = await cart.addProductToCart(cid, pid);
                res.status(200).json({ message: "success", data: response });
                logger.debug(`El producto con ID ${pid} se agregó al carrito con ID ${cid}`);
            }}else{
                const response = await cart.addProductToCart(cid, pid);
                res.status(200).json({ message: "success", data: response });
                logger.debug(`El producto con ID ${pid} se agregó al carrito con ID ${cid}`);
            }
        } else {
            res.status(404).json({ message: "Producto no encontrado", data: null });
            logger.error(`El producto con ID ${pid} no se encontró`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: CustomError.createError({
            name: "Error al agregar producto al carrito",
            cause: generateCartErrorInfo(cid),
            message: "Error al agregar producto al carrito",
            code: EErrors.DATABASE_ERROR
        }), data: error });
    }
};

export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const response = await cart.updateProductFromCart(cid, pid, quantity);
        res.status(200).json(response);
        logger.debug(`El producto con ID ${pid} en el carrito con ID ${cid} se actualizó correctamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const deleteCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await cart.deleteProductsFromCart(id);
        res.status(200).json(response);
        logger.debug(`El carrito con ID ${id} se eliminó correctamente`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await cart.removeProductFromCart(cid, pid);
        res.status(200).json(response);
        logger.debug(`El producto con ID ${pid} se eliminó del carrito con ID ${cid}`);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const purchase = async (req, res) => {
    const ticket = new Ticket();
    try {
        const response = await ticket.createTicket(req, res);
        if (response) {
            res.status(200).render("ticket",{
                title : "Ticket",
                ticket : response,
                style : "../../css/ticket.css"
            });
            logger.debug('El ticket se creó y se renderizó correctamente');
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json(error.message);
    }
};
