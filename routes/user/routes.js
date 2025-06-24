import express from "express";

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;

  // TODO: fetched from the database

  // TODO: fetch all todo from user

  res.status(404).render("user/user");
});

export default userRouter;
