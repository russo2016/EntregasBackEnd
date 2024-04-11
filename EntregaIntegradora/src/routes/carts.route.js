import { Router } from "express";
import * as controller from "../controllers/carts.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/:id",auth(["PUBLIC"]), controller.getCartById);
router.post("/:cid/products/:pid",auth(["user","premium"]), controller.addProductToCart);
router.put("/:cid/product/:pid",auth(["user"]), controller.updateProductInCart);
router.delete("/:id",auth(["user","premium"]), controller.deleteCartById);
router.delete("/:cid/product/:pid",auth(["user"]), controller.removeProductFromCart);
router.get("/:cid/purchase",auth(["user","premium"]), controller.purchase);

export default router;
