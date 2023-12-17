import { Router } from "express";
import {ProductManager} from '../classes/productManager.js';

const router = Router();
const productManager = new ProductManager("productos.json");

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if (limit) {
            let tempArray = products.filter((dat, index) => index < limit);
            res.status(200).json({ data: tempArray, limit: limit, quantity: tempArray.length });
          } else {
            res.status(200).json({ data: products, limit: false, quantity: products.length });
          }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
  
    try {
      const result = await productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );
      res.status(200).json({ message: "success", data: result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error", data: err });
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
  
    try {
      let product = await productManager.getProductById(pid);
      if (product) {
        let newProduct = {
          title: title || product.title,
          description: description || product.description,
          price: price || product.price,
          thumbnail: thumbnail || product.thumbnail,
          code: code || product.code,
          stock: stock || product.stock,
        };
        const producto = await productManager.updateProductById(pid, newProduct);
        res.status(200).json({ message: "success", data: producto });
      } else {
        res.status(200).json({message: "el producto solicitado no existe"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error", data: err });
    }
  });

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      let product = await productManager.getProductById(pid);
  
      if (product) {
        const respuesta = await productManager.deleteProductById(pid);
        res.status(200).json({ message: "success", data: respuesta });
      } else {
        res.status(200).json({
          message: "el producto solicitado no existe",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error", data: err });
    }
});

export default router;