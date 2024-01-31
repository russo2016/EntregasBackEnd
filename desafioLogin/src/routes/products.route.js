import { Router } from "express";
import Product from "../services/products.js";
import { ProductsModel } from "../models/products.js";

const router = Router();

const product = new Product();

router.get("/", async (req, res) => {
    try{
        const {limit, page, query, sort} = req.query;
        const parsedQuery = () =>{
            if (query){
                return JSON.parse(query);
            }
            return {}
        }
        const isSorted = () => {
            if (sort){
            if (sort === "asc"){
                return 1
            }else if (sort === "desc"){
                return -1
            }
        }else{
                return null
            }
        }
        const response = await ProductsModel.paginate(
        parsedQuery(),{
                limit: limit || 10,
                page: page || 1,
                sort: sort ? { price: isSorted() } : null
            }
        );
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await product.getById(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try{
        const response = await product.saveProducts({ title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try{
        const response = await product.updateProduct(id, { title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await product.deleteProduct(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).json(error);
    }
});

export default router;