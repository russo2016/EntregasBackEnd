import {createAndGetAllFakeProducts} from "../controllers/mocking.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";


const router = Router();

router.get("/mockingProducts",auth(["PUBLIC"]), createAndGetAllFakeProducts);

export default router;