import express from "express";
import authRouter from "./routes/auth/routes.js";
import userRouter from "./routes/user/routes.js";
import apiRouter from "./routes/api/routes.js";

const app = express();
const port = 8500;

app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/api", apiRouter);

const layer1 = (req, res, next) => {
  console.log("Layer 1");

  res.redirect("/auth/login");
};

const layer2 = (req, res, next) => {
  console.log("Layer 2");
  next();
};

const layer3 = (req, res, next) => {
  console.log("Layer 3");
  res.send("Middleware example completed");
};

const middlewares = [layer1, layer2, layer3];

app.get("/middleware", middlewares);

// Define a basic route
app.get("/", (req, res) => {
  res.render("index", { title: "EJS Example", message: "Welcome to EJS!" });
});

// Handle 404 errors

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
