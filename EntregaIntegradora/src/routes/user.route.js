import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), controller.getAllUsers)
router.get("/:id",auth(["PUBLIC"]), controller.getUserById)
router.post("/premium/:id",auth(["PUBLIC"]), controller.changeRole)

export default router;