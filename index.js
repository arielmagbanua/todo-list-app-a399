import express from "express";

const app = express();
const port = 8500;

app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// authentication routes
app.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

app.get("/auth/registration", (req, res) => {
  res.render("auth/registration");
});

// user routes
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  // TODO: fetched from the database

  // TODO: fetch all todo from user

  res.render("user/user");
});

// api routes
app.post("/api/todo", (req, res) => {
  // TODO: create a new todo item

  res.json({ message: "Create todo successful" });
});

app.put("/api/todo/:id", (req, res) => {
  const todoId = req.params.id;

  // TODO: update the todo item with the given id

  res.json({ message: `Update todo with id ${todoId} successful` });
});

app.delete("/api/todo/:id", (req, res) => {
  const todoId = req.params.id;

  res.json({ message: `Delete todo with id ${todoId} successful` });
});

// Define a basic route
app.get("/", (req, res) => {
  res.render("index", { title: "EJS Example", message: "Welcome to EJS!" });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
