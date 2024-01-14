import { Router } from "express";
import Product from "../dao/dbManager/products.js";
import Message from "../dao/dbManager/messages.js";
import Cart from "../dao/dbManager/carts.js";
import { ProductsModel } from "../dao/models/products.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola mundo");
});

router.get("/products", async (req, res) => {
    const products = new Product();
    const result = await products.getAll();
    res.status(200).render("products", {
        title: "Listado de productos",
        products: result,
        style: "css/products.css"
    });
});

router.get("/messages", async (req, res) => {
    const messages = new Message();
    const result = await messages.getAll();
    res.render("messages", {
        title: "Listado de mensajes",
        messages: result,
        style: "css/messages.css"
    });
});

router.get("/carts/:id", async (req, res) => {
    const { id } = req.params;
    const cart = new Cart();
    const result = await cart.getById(id);

    const productsInfo = await Promise.all(result.product.map(async (cartProduct) => {
        const productInfo = await ProductsModel.findById(cartProduct.product);
        return {
            title: productInfo.title,
            description: productInfo.description,
            price: productInfo.price,
            thumbnail: productInfo.thumbnail,
            code: productInfo.code,
            stock: productInfo.stock,
            quantity: cartProduct.quantity
        };
    }));

    res.render("carts", {
        title: "Carrito",
        products: productsInfo,
        style: "../css/carts.css"
    });
});

export default router;