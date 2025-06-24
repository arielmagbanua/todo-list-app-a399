import express from "express";
import redirectIfNotAuthenticated from "../../middlewares/redirectIfNotAuthenticated.js";

import Todo from "../../models/todo.js";

const todosRouter = express.Router();

todosRouter.use(redirectIfNotAuthenticated);

todosRouter.get("/", (req, res) => {
  // get the user id from the session
  const { id, name } = req.session.user;

  // TODO: get all todos that belongs to the user

  res.render("todos/index", { name, authenticated: true });
});

export default todosRouter;
