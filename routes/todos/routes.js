import express from "express";
import redirectIfNotAuthenticated from "../../middlewares/redirectIfNotAuthenticated.js";

import Todo from "../../models/todo.js";

const todosRouter = express.Router();

todosRouter.use(redirectIfNotAuthenticated);

todosRouter.get("/", async (req, res) => {
  // get the user id from the session
  const { id, name } = req.session.user;

  let todos = [];

  try {
    // get all todos that belongs to the user
    todos = await Todo.find({ userId: id });
  } catch (error) {
    // something went wrong, log the error
    console.error(error);
  }

  res.render("todos/index", { name, authenticated: true, todos });
});

export default todosRouter;
