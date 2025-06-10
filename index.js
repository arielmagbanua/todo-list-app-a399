import express from "express";

const app = express();
const port = 8500;

app.use(express.static("public"));
app.use(express.static("publiko"));

const todosRouter = express.Router();

// reading all todo items
todosRouter.get("/todos", (req, res) => {
  res.send("Get All TODOS");
});

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Define a basic route
app.get("/", (req, res) => {
  res.render("index", { title: "EJS Example", message: "Welcome to EJS!" });
});

app.get("/users", (req, res) => {
  // fetched from the database
  const user1 = { name: "Alice", age: 18 };
  const user2 = { name: "Bob", age: 30 };
  const user3 = { name: "Charlie", age: 32 };

  const users = [user1, user2, user3];
  res.render("users", { users: [], test: "This is a test" });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  const user1 = { id: "user1", name: "Alice", age: 18 };
  const user2 = { id: "user2", name: "Bob", age: 30 };
  const user3 = { id: "user3", name: "Charlie", age: 32 };

  const users = [user1, user2, user3];
  res.render("user", { users: users, id: userId });
});

app.get("/sign-in", (req, res) => {
  res.send("Login screen");
});

app.use("/", todosRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
