import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";

const router = Router();

router.get("/", controller.getAllUsers)
router.get("/:id", controller.getUserById)
router.post("/premium/:id", controller.changeRole)

export default router;