import { Router } from "express";
import Cart from "../services/carts.js";

const router = Router();
const cart = new Cart();

router.get("/", async (req, res) => {
    try{
        const response = await cart.getAll();
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await cart.getById(id);
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/", async (req, res) => {
    const { timestamp, products } = req.body;
    try{
        const response = await cart.saveCart({ timestamp, product : products });
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const response = await cart.addProductToCart(cid, pid);
      res.status(200).json({ message: "success", data: response });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error", data: err });
    }
  });

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { timestamp, products } = req.body;
    try{
        const response = await cart.updateCart(id, { timestamp, products });
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await cart.deleteProductsFromCart(id);
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json(error);
    }
});

export default router;