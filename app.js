const express = require("express");
const todoRouter = require("./routes/todo");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Enhanced Express Todo App!" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use("/todos", todoRouter);

module.exports = app;
