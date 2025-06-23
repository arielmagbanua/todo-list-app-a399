import express from "express";
import redirectIfNotAuthenticated from "../../middlewares/redirectIfNotAuthenticated.js";

const todosRouter = express.Router();

todosRouter.use(redirectIfNotAuthenticated);

todosRouter.get("/", (req, res) => {
  // get the user id from the session
  const { name } = req.session.user;

  res.render("todos/index", { name, authenticated: true });
});

export default todosRouter;
