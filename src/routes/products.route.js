import { Router } from "express";
import * as productsController from "../controllers/products.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), productsController.getAllProducts);
router.get("/:id",auth(["PUBLIC"]), productsController.getProductById);
router.post("/",auth(["PUBLIC"]), productsController.createProduct);
router.put("/:id",auth(["admin","premium"]), productsController.updateProduct);
router.delete("/:id",auth(["PUBLIC"]), productsController.deleteProduct);

export default router;
