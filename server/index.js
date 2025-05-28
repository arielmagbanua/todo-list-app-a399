import express from "express";

const app = express();

// define the port
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Todo App!!!");
});

app.get("/enter", (req, res) => {
  res.send("Login screen");
});

app.get("/user", (req, res) => {
  res.send("User screen");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
