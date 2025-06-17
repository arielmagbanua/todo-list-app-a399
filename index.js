import express from "express";
import cors from "cors";
import connect from "./database/mongodb-connect.js";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth/routes.js";
import userRouter from "./routes/user/routes.js";
import apiRouter from "./routes/api/routes.js";

const port = process.env.PORT || 8500;
const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// enable CORS for all routes
app.use(cors());

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

// attempt connection to mongodb
connect();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
