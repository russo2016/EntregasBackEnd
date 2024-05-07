import { ProductService } from "../repository/index.js";
import CustomError from "../errorTools/customError.js";
import EErrors from "../errorTools/enum.js";
import { generateProductErrorInfo } from "../errorTools/info.js";
import getLogger from "../utils/logger.js";
import { Products } from "../dao/factory.js";
import nodemailer from "nodemailer";
import {userService} from "../repository/index.js";

const logger = getLogger();
const productService = ProductService;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export const getAllProducts = async (req, res) => {
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
        const response = await productService.getAll({
            limit: limit || 10,
            page: page || 1,
            sort: sort ? { price: isSorted() } : null,
        });
        res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await productService.getById(id);

        res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        res.status(500).json(CustomError.createError({
            name: "Error obteniendo el producto",
            cause: generateProductErrorInfo(req.body),
            message: "Error obteniendo el producto",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }
};

export const createProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        let owner = "admin";
        if (req.user){
            owner = req.user.email;
        }
        const response = await productService.saveProduct({ title, description, price, thumbnail, code, stock,owner});
        logger.debug("Producto creado con éxito")
        res.status(200).json({response,success : true});
    } catch (error) {
        logger.error(error);
        res.status(500).json(CustomError.createError({
            name: "Error creando el producto",
            cause: generateProductErrorInfo(req.body),
            message: "Error creando el producto",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const response = await productService.updateProduct(id, { title, description, price, thumbnail, code, stock });
        logger.debug("Producto editado con éxito")
        res.status(200).json({response,success : true});
    } catch (error) {
        logger.error(error);
        res.status(500).json(CustomError.createError({
            name: "Error editando el producto",
            cause: generateProductErrorInfo(req.body),
            message: "Error editando el producto",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        let result
        const product = await productService.getById(id);
        if(product.owner != "admin"){
            const productOwner = await userService.getUser(product.owner);
            if(productOwner.role == "premium"){
                result = await transporter.sendMail({
                    from: `${process.env.EMAIL}`,
                    to: `${product.owner}`,
                    subject: "Producto eliminado",
                    text: "Este mail es para notificar que su producto ha sido eliminado",
                    html: `<p>El producto ${product.title} fue eliminado</p>`
                });
                const response = await productService.deleteProduct(id);
                logger.debug("Producto eliminado con éxito")
                res.status(200).json({response:response, success : true});
            }else{
                const response = await productService.deleteProduct(id);
                logger.debug("Producto eliminado con éxito")
                res.status(200).json({response:response, success : true});
            }
        }else{
            const response = await productService.deleteProduct(id);
            logger.debug("Producto eliminado con éxito")
            res.status(200).json({response:response, success : true});
        }
    } catch (error) {
        console.log(error)
        // logger.error(error);
        // res.status(500).json(CustomError.createError({
        //     name: "Error eliminando el producto",
        //     cause: generateProductErrorInfo(req.body),
        //     message: "Error eliminando el producto",
        //     code: EErrors.INVALID_TYPES_ERROR
        // }));
    }
};
