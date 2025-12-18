const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  // 🔍 DEBUG: see what backend actually receives
  console.log("LOGIN ATTEMPT →", { email, password });

  // TEMP ADMIN LOGIN
  if (email === "admin@gmail.com" && password === "123") {
    const token = jwt.sign(
      { userId: "1", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      role: "admin",
    };
  }

  // TEMP EMPLOYEE LOGIN
  if (email === "employee@test.com" && password === "123") {
    const token = jwt.sign(
      { userId: "2", role: "employee" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      role: "employee",
    };
  }

  // ❌ INVALID CREDENTIALS
  throw new Error("Invalid credentials");
};

module.exports = {
  login,
};
