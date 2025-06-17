import express from "express";

const apiRouter = express.Router();

apiRouter.post("/todo", (req, res) => {
  // TODO: create a new todo item

  res.json({ message: "Create todo successful" });
});

apiRouter.put("/todo/:id", (req, res) => {
  const todoId = req.params.id;

  // TODO: update the todo item with the given id

  res.json({ message: `Update todo with id ${todoId} successful` });
});

apiRouter.delete("/todo/:id", (req, res) => {
  const todoId = req.params.id;

  res.json({ message: `Delete todo with id ${todoId} successful` });
});

apiRouter.post("/user/create", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // TODO: create a new user
  res.json({
    message: `User created successfully`,
  });
});

export default apiRouter;
