const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt.util");
const userRepository = require("../repositories/user.repository");

const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    role: user.role,
  };
};

module.exports = {
  login,
};
