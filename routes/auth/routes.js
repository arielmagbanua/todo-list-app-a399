import express from "express";

const authRouter = express.Router();

// authentication routes
authRouter.get("/login", (req, res) => {
  res.render("auth/login");
});

authRouter.get("/registration", (req, res) => {
  res.render("auth/registration");
});

authRouter.post("/login", (req, res) => {
  // login process

  return res.status(401).json({
    message: "Login failed",
  });
});

export default authRouter;
