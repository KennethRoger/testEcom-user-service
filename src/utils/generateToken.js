const client = require("../grpc-client");

function generateToken(userData) {
  const tokenData = { _id: userData._id, role: userData.role };
  
  return new Promise((resolve, reject) => {
    // A grpc method calling auth-service
    client.GenerateToken(tokenData, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.success) resolve(res.token);
      else resolve(null);
    })
  })
}

module.exports = generateToken;