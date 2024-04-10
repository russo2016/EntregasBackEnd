import { Router } from "express";
import * as controller from "../controllers/messages.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), controller.getAllMessages);
router.post("/",auth(["user"]), controller.createMessage);
router.put("/:id",auth(["PUBLIC"]), controller.updateMessage);
router.delete("/:id",auth(["PUBLIC"]), controller.deleteMessage);

export default router;
