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
import mockingRouter from './routes/mocking.route.js';
import getLogger from './utils/logger.js';
import usersRouter from './routes/user.route.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";
const CODERSECRET = process.env.CODERSECRET;
const logger = getLogger();
import MongoSingleton from './mongoSingleton.js';


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	logger.info("Se conectó un nuevo usuario");
});

const DB_connection = MongoSingleton.getInstance();

const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentacion Ecommerce Russo",
        version: "1.0.0",
        description: "API creada para Ecommerce",
        contact: {
          name: "Russo",
        },
        servers: ["http://localhost:8080"],
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  };

const specs = swaggerJsdoc(swaggerOptions);
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
app.use("/carts",cartsRouter);
app.use("/",mockingRouter)
app.use("/users",usersRouter)
app.use("/api/users",usersRouter)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.get('/loggerTest', (req, res) => {
    logger.debug('Debug message');
    logger.http('HTTP message');
    logger.info('Info message');
    logger.warning('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal message');
    res.send('Logging test completed');
});