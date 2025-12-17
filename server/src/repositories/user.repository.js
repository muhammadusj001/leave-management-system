const User = require("../models/User.model");

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (userData) => {
  return User.create(userData);
};

module.exports = {
  findUserByEmail,
  createUser,
};
