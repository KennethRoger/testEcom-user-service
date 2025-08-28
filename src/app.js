const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from testEcom-user-service</h1>");
});

app.use("/users", userRoutes);

// Error response handler
app.use(errorHandler);

module.exports = app;