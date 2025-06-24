import express from "express";
import bcrypt from "bcryptjs";
import failInUnauthorized from "../../middlewares/failInUnauthorized.js";

const apiRouter = express.Router();

// models
import User from "../../models/user.js";

apiRouter.post(failInUnauthorized, "/todo", async (req, res) => {
  // get the user id from the session
  const { id } = req.session.user;

  // get todo data from the request body
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      userId: id,
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo.", error });
  }

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

apiRouter.post("/user", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // capture duplicate email using try-catch
  try {
    const result = await User.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    res.status(201).json(result);
  } catch (error) {
    if (
      error.errorResponse.errmsg.includes(
        "E11000 duplicate key error collection"
      )
    ) {
      // user already exists
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

apiRouter.post("/login", async (req, res) => {
  // get the email and password from the request body
  const { email, password } = req.body;

  const unauthorizedResponse = {
    message: "Invalid email or password, please try again.",
  };

  try {
    // find the user by email
    const user = await User.where({ email }).findOne();

    if (!user) {
      // user not found
      return res.status(401).json(unauthorizedResponse);
    }

    // compare the password with the hashed password in the database
    const result = bcrypt.compareSync(password, user.password);
    if (!result) {
      // password does not match
      return res.status(401).json(unauthorizedResponse);
    }

    // store the user in the session and redirect to the home page
    req.session.user = {
      id: user._id,
      name: user.firstname + " " + user.lastname,
    };

    res.json({ message: "Login successful" });
  } catch (error) {
    return res.status(401).json(unauthorizedResponse);
  }
});

apiRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
});

export default apiRouter;
