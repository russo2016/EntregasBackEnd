import { Router } from "express";
import Product from "../dao/dbManager/products.js";

const router = Router();

const product = new Product();

router.get("/", async (req, res) => {
    try{
        const response = await product.getAll();
        res.status(200).json(response);
    }catch(error){
        res.status(500).log(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await product.getById(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).log(error);
    }
});

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try{
        const response = await product.saveProducts({ title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    }catch(error){
        res.status(500).log(error);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try{
        const response = await product.updateProduct(id, { title, description, price, thumbnail, code, stock });
        res.status(200).json(response);
    }catch(error){
        res.status(500).log(error);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await product.deleteProduct(id);
        res.status(200).json(response);
    }catch(error){
        res.status(500).log(error);
    }
});

export default router;