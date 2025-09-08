const jwt = require("jsonwebtoken");

function generateToken(userData) {
  const tokenData = { _id: userData._id, role: userData.role };
  return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "24h" });
}

module.exports = generateToken;
