const jwt = require("jsonwebtoken");

function generateToken(userData) {
  return jwt.sign(
    { _id: userData._id, email: userData.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}
