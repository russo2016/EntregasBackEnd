import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from "./routes/views.route.js";
import productsRouter from "./routes/products.route.js";
import messagesRouter from "./routes/messages.route.js";
import cartsRouter from "./routes/carts.route.js";
import { __dirname } from './utils.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionRouter from './routes/session.route.js';
import passport from 'passport';
import initializeGitHubPassport from './config/githubPassport.config.js';
import initializePassport from "./config/passport.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";
const CODERSECRET = process.env.CODERSECRET;
import MongoSingleton from './mongoSingleton.js';

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});

const DB_connection = MongoSingleton.getInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(CODERSECRET));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine","handlebars")

initializeGitHubPassport();
initializePassport();
app.use(session({
    store: MongoStore.create({
         mongoUrl: DB_URL,
         ttl: 15 * 60 * 1000,
         mongoOptions: {
             useNewUrlParser: true
        }
        }),
    secret: CODERSECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/",viewsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", sessionRouter);
app.use("/api/products",productsRouter);
app.use("/api/messages",messagesRouter);
app.use("/api/carts",cartsRouter);

app.get("*", (req, res) => {
    res.status(404).send({error: "Not found"});
});