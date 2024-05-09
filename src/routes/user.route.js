import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";
import multerUploader from "../middlewares/multer.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), controller.getAllUsers)
router.get("/userRole",auth(["admin"]), controller.getUserRole)
router.get("/full",auth(["PUBLIC"]), controller.getUsers)
router.delete("/",auth(["PUBLIC"]), controller.deleteUsersNotUsedInLast2Hours)
router.put("/:id/:role",auth(["PUBLIC"]), controller.setRole)
router.get("/:id",auth(["PUBLIC"]), controller.getUserById)
router.post("/premium/:id",auth(["PUBLIC"]), controller.changeRole)
router.post("/:uid/documents",multerUploader.single("file"),auth(["PUBLIC"]), controller.uploadDocuments)
router.delete("/:id",auth(["PUBLIC"]), controller.deleteUserById)

export default router;