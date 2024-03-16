import {ProductService} from "../repository/index.js";

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
        res.status(500).json(error);
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await productService.getById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const response = await productService.saveProducts({ title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error);
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        const response = await productService.updateProduct(id, { title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await productService.deleteProduct(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
