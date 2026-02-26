const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const todoRouter = require("./routes/todo");
const swaggerSpec = YAML.load("./swagger.yml");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Enhanced Express Todo App!" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/todos", todoRouter);

module.exports = app;
