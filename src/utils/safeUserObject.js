function toSafeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

module.exports = toSafeUser;
