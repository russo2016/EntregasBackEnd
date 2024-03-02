import { Router } from "express";
import * as controller from "../controllers/controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/products", controller.getProducts);
router.get("/messages", controller.getMessages);
router.get("/carts/:id", controller.getCartById);

export default router;
