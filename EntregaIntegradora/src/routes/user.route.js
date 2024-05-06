import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";
import multerUploader from "../middlewares/multer.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), controller.getAllUsers)
router.get("/full",auth(["PUBLIC"]), controller.getUsers)
router.get("/:id",auth(["PUBLIC"]), controller.getUserById)
router.get("/userRole", auth(["PUBLIC"]), controller.getUserRole)
router.post("/premium/:id",auth(["PUBLIC"]), controller.changeRole)
router.post("/:uid/documents",multerUploader.single("file"),auth(["PUBLIC"]), controller.uploadDocuments)
router.delete("/",auth(["PUBLIC"]), controller.deleteUsersNotUsedInLast2Hours)

export default router;