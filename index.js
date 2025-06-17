import express from "express";
import authRouter from "./routes/auth/routes.js";
import userRouter from "./routes/user/routes.js";
import apiRouter from "./routes/api/routes.js";

const app = express();
const port = 8500;

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));
// Middleware to parse JSON bodies
app.use(express.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

// Handle 404 errors

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
