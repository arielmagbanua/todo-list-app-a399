import express from "express";
import bcrypt from "bcryptjs";
import failIfUnauthorized from "../../middlewares/failIfUnauthorized.js";
import upload from "../../middlewares/multerStorage.js";

import User from "../../models/user.js";
import Todo from "../../models/todo.js";

const apiRouter = express.Router();

apiRouter.post(
  "/todo",
  failIfUnauthorized,
  upload.single("image"),
  async (req, res) => {
    // get the user id from the session
    const { id } = req.session.user;

    // get the image filename from the uploaded file
    const imageFilename = req.file.filename;

    // get todo data from the request body
    const { title, description } = req.body;

    try {
      const newTodo = new Todo({
        userId: id,
        title,
        description,
        image: imageFilename, // store the filename of the uploaded image
      });

      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ message: "Error creating todo." });
    }
  }
);

apiRouter.put("/todo", upload.single("image"), async (req, res) => {
  // get the image filename from the uploaded file
  const imageFilename = req.file?.filename;

  const { todoId, title, description } = req.body;
  const updatedTodo = { title, description };

  if (imageFilename) {
    // if an image is uploaded, add the image filename to the updatedTodo object
    updatedTodo.image = imageFilename;
  }

  try {
    // update the todo with the given id
    const result = await Todo.updateOne({ _id: todoId }, updatedTodo);
    if (result.acknowledged) {
      return res.json({ message: "Todo updated successfully." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error updating todo." });
  }
});

apiRouter.get("/todo/:id", failIfUnauthorized, async (req, res) => {
  const todoId = req.params.id;
  const { id: userId } = req.session.user;

  try {
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo" });
  }
});

apiRouter.delete("/todo/:id", failIfUnauthorized, async (req, res) => {
  const todoId = req.params.id;

  try {
    // find the todo by id and delete it
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
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
