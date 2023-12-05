import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager("src/productos.json");

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProduct();
        res.json(products);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos' });
    }
});


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(parseInt(id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el producto' });
    }
});


app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
});