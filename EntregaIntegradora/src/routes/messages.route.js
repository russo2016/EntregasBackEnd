import { Router } from "express";
import * as controller from "../controllers/messages.controllers.js";

const router = Router();

router.get("/", controller.getAllMessages);
router.get("/:id", controller.getMessageById);
router.post("/", controller.createMessage);
router.put("/:id", controller.updateMessage);
router.delete("/:id", controller.deleteMessage);

export default router;
