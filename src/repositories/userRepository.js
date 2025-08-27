const User = require("../models/mongodb/user/model");

class UserRepository {
  create(userData) {
    const user = new User(userData);
    return user.save();
  }

  findOne(data) {
    return User.findOne(data);
  }

  findById(userId) {
    return User.findById(userId);
  }

  findAll() {
    return User.find();
  }
}

module.exports = new UserRepository();
