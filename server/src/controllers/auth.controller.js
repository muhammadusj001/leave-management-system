const login = async (req, res) => {
  const { email, password } = req.body;

  // DEBUG (important – helps you see what's coming from frontend)
  console.log("LOGIN REQUEST:", email, password);

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  // EMPLOYEE LOGIN
  if (email === "employee@test.com" && password === "123") {
    return res.status(200).json({
      token: "employee-token",
      role: "employee",
    });
  }

  // ADMIN LOGIN
  if (email === "admin@gmail.com" && password === "123") {
    return res.status(200).json({
      token: "admin-token",
      role: "admin",
    });
  }

  // INVALID LOGIN
  return res.status(401).json({
    message: "Invalid credentials",
  });
};

module.exports = {
  login,
};
