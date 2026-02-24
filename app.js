const express = require("express");
const todoRouter = require("./routes/todo");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  console.log("Root endpoint hit");
  res.json({ message: "Welcome to the Express Todo API" });
});

app.use("/todos", todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
