import { Router } from "express";
import Product from "../services/products.js";
import Message from "../services/messages.js";
import Cart from "../services/carts.js";
import { ProductsModel } from "../models/products.js";
import { CartsModel } from "../models/carts.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola mundo");
});

router.get("/products", async (req, res) => {
    const product = new Product();
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
        const productsData = await ProductsModel.paginate(
        parsedQuery(),{
                limit: limit || 1,
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
        }catch(error){
        res.status(500).json(error);
    }
});

router.get("/messages", async (req, res) => {
    const messages = new Message();
    const result = await messages.getAll();
    try{
        res.status(200).render("messages", {
            title: "Listado de mensajes",
            messages: result,
            style: "css/messages.css"
    });
    }catch(error){
        res.status(500).json(error);
    }
});

router.get("/carts/:id", async (req, res) => {
    const { id } = req.params;
    const cart = new Cart();
    const result = await CartsModel.findById(id).populate("product.product").lean();
    try{
        res.status(200).render("carts", {
            title: "Carrito",
            products: result.product,
            style: "../css/carts.css"
        });
    }catch(error){
        res.status(500).json(error);
    }

});

export default router;