import { Router } from "express";
import * as controller from "../controllers/views.controllers.js";
import auth from "../middlewares/auth.js";
import {purchase} from "../controllers/carts.controllers.js";

const router = Router();

router.get("/products",auth("PUBLIC"), controller.getProducts);
router.get("/messages",auth("PUBLIC"), controller.getMessages);
router.get("/carts/:id",auth("PUBLIC"), controller.getCartById);
router.get("/realtime",auth("admin"), controller.realtime);
router.get("/carts/:cid/purchase",auth("PUBLIC"), purchase);

export default router;
