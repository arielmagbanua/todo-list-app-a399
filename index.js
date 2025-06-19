import express from "express";
import cors from "cors";
import connect from "./database/mongodb-connect.js";
import dotenv from "dotenv";
import session from "express-session";

// configure dotenv to load environment variables
dotenv.config();

import authRouter from "./routes/auth/routes.js";
import userRouter from "./routes/user/routes.js";
import apiRouter from "./routes/api/routes.js";
import todosRouter from "./routes/todos/routes.js";

const port = process.env.PORT || 8500;
const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// enable CORS for all routes
app.use(
  cors({
    credentials: true, // allow cookies to be sent
  })
);
// configure session management
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "isjdf121391u239u1-192381723-aajcaslkd", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  // redirect to the todos page
  res.redirect("/todos");
});

// attempt connection to mongodb
connect();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
