// Access to env variable
require("dotenv").config();

const app = require("./app")
const connectDB = require("./models/mongodb/connectDB");

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log(`Connected to DB ${process.env.MONGO_URI}`);

    // Start listening to port after DB connection
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`user-service started listening on ${PORT}`);
    });
  })
  .catch((err) => {
    throw err;
  });
