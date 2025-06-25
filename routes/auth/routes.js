import express from "express";
import redirectTodosIfAuthenticated from "../../middlewares/redirectTodosIfAuthenticated.js";

const authRouter = express.Router();

authRouter.use(redirectTodosIfAuthenticated);

// authentication routes
authRouter.get("/login", (req, res) => {
  res.render("auth/login", { authenticated: false });
});

authRouter.get("/registration", (req, res) => {
  res.render("auth/registration", { authenticated: false });
});

export default authRouter;
