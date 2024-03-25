import { ProductService } from "../repository/index.js";
import CustomError from "../errorTools/customError.js";
import EErrors from "../errorTools/enum.js";
import { generateProductErrorInfo } from "../errorTools/info.js";
import getLogger from "../utils/logger.js";
import { Products } from "../dao/factory.js";

const logger = getLogger();
const productService = ProductService;

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
        const response = await productService.saveProduct({ title, description, price, thumbnail, code, stock });
        logger.debug("Producto creado con éxito")
        res.status(200).json(response);
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
        res.status(200).json(response);
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
        const response = await productService.deleteProduct(id);
        logger.debug("Producto eliminado con éxito")
        res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        res.status(500).json(CustomError.createError({
            name: "Error eliminando el producto",
            cause: generateProductErrorInfo(req.body),
            message: "Error eliminando el producto",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }
};
