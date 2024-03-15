import { Router } from "express";
import * as controller from "../controllers/carts.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/:id",auth("PUBLIC"), controller.getCartById);
router.post("/:cid/products/:pid",auth("PUBLIC"), controller.addProductToCart);
router.put("/:cid/product/:pid",auth("PUBLIC"), controller.updateProductInCart);
router.delete("/:id",auth("user"), controller.deleteCartById);
router.delete("/:cid/product/:pid",auth("PUBLIC"), controller.removeProductFromCart);

export default router;
