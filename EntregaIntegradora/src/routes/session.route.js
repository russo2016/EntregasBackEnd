import { Router } from "express";
import passport from "passport";
import * as controller from "../controllers/controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", isAuthenticated, controller.getSignupPage);
router.get("/login", isAuthenticated, controller.getLoginPage);
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/api/sessions/current", controller.getCurrentSession);
router.get("/github",passport.authenticate("github", { scope: ["user:email"] }),async (req, res) => {});
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.admin = true;
    res.redirect("/products");
  }
);

export default router;