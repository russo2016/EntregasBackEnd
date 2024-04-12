import { Router } from "express";
import * as controller from "../controllers/carts.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/:id",auth(["PUBLIC"]), controller.getCartById);
router.post("/:cid/products/:pid",auth(["PUBLIC"]), controller.addProductToCart);
router.put("/:cid/products/:pid",auth(["PUBLIC"]), controller.updateProductInCart);
router.delete("/:id",auth(["PUBLIC"]), controller.deleteCartById);
router.delete("/:cid/products/:pid",auth(["PUBLIC"]), controller.removeProductFromCart);
router.get("/:cid/purchase",auth(["PUBLIC"]), controller.purchase);

export default router;
