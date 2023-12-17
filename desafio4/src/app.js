import express from 'express';
import { Server, Socket } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import {ProductManager} from './classes/productManager.js';

const app = express();
const PORT = 8080;
const productManager = new ProductManager("productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.status(200).send("hola mundo");
  });

app.use("/api/productos", productRouter)
app.use("/api/cart", cartRouter);
app.use("/",viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


const server = app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
});

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  socket.on("addProduct", async (product) => {
    const title = product.title;
    const description = product.description;
    const price = product.price;
    const thumbnail = product.thumbnail;
    const code = product.code;
    const stock = product.stock;
    try {
      const result = await productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );
      const allProducts = await productManager.getProducts();
      console.log(allProducts);
      result && socketServer.emit("updateProducts", allProducts);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("deleteProduct", async (id)=>{
    try{
      const result = await productManager.deleteProductById(id);
      result && socketServer.emit("updateProducts", await productManager.getProducts());
    } catch(err){
      console.log(err);
    }
  });

});