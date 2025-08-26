const express = require("express");
const app = express();

const connectDB = require("./src/models/mongodb/connectDB");
const userRoutes = require("./src/routes/userRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

// Access to env variable 
require("dotenv").config()

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Hello from testEcom-user-service</h1>");
})

app.use("/users", userRoutes);
// Error response handler
app.use(errorHandler)

connectDB()
.then(() => {
  console.log(`Connected to DB ${process.env.MONGO_URI}`)

  // Start listening to port after DB connection
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`user-service started listening on ${PORT}`);
  });
})
.catch((err) => {
  throw err;
})