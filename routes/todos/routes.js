import express from "express";
import User from "../../models/user.js";

const todosRouter = express.Router();

todosRouter.get("/", (req, res) => {
  // get the user id from the session
  const { name } = req.session.user;

  res.render("todos/index", { name });
});

export default todosRouter;
