import express from "express";

const userRouter = express.Router();

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware executed");

  next();
};

userRouter.use(authMiddleware);

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;

  // TODO: fetched from the database

  // TODO: fetch all todo from user

  res.status(404).render("user/user");
});

export default userRouter;
