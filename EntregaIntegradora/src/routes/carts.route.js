import { Router } from "express";
import * as controller from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", controller.getAllCarts);
router.get("/:id", controller.getCartById);
router.post("/", controller.createCart);
router.post("/:cid/products/:pid", controller.addProductToCart);
router.put("/:cid/product/:pid", controller.updateProductInCart);
router.delete("/:id", controller.deleteCartById);
router.delete("/:cid/product/:pid", controller.removeProductFromCart);

export default router;
