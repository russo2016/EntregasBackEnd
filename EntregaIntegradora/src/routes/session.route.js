import { Router } from "express";
import passport from "passport";
import * as controller from "../controllers/sessions.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/",auth(["PUBLIC"]), isAuthenticated, controller.getSignupPage);
router.get("/login",auth(["PUBLIC"]), isAuthenticated, controller.getLoginPage);
router.post("/signup",auth(["PUBLIC"]), controller.signup);
router.post("/login",auth(["PUBLIC"]), controller.login);
router.get("/forgotPassword",auth(["PUBLIC"]), controller.getForgotPasswordPage);
router.post("/forgotPassword",auth(["PUBLIC"]), controller.forgotPassword);
router.get("/forgotPassword/:email",auth(["PUBLIC"]), controller.getNewPasswordPage);
router.post("/forgotPassword/:email",auth(["PUBLIC"]), controller.updateNewPassword);
router.post("/logout",auth(["PUBLIC"]), controller.logout);
router.get("/api/sessions/current",auth(["PUBLIC"]), controller.getCurrentSession);
router.get("/github",auth(["PUBLIC"]),passport.authenticate("github", { scope: ["user:email"] }),async (req, res) => {});
router.get(
  "/githubcallback",auth(["PUBLIC"]),
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.admin = true;
    res.redirect("/products");
  }
);

export default router;