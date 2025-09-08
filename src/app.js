const express = require("express");
const app = express();
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(morgan((tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    response_time: tokens['response-time'](req, res) + ' ms',
    content_length: tokens.res(req, res, 'content-length'),
    service: "gateway-service"
  });
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from testEcom-user-service</h1>");
});

app.use("/users", userRoutes);

// Error response handler
app.use(errorHandler);

module.exports = app;