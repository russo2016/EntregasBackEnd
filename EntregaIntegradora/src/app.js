import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.route.js";
import productsRouter from "./routes/products.route.js";
import messagesRouter from "./routes/messages.route.js";
import cartsRouter from "./routes/carts.route.js";
import { __dirname } from './utils.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars")

app.use("/",viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/messages",messagesRouter);
app.use("/api/carts",cartsRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(DB_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log("no se conecto",err);
    });