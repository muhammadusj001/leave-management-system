const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  // Match fake tokens from login - using real MongoDB ObjectIds for demo
  if (token === "employee-token") {
    req.user = { userId: "676389a1b2c3d4e5f6789012", role: "Employee" };
    return next();
  }

  if (token === "admin-token") {
    req.user = { userId: "676389a1b2c3d4e5f6789013", role: "Admin" };
    return next();
  }

  return res.status(401).json({
    message: "Invalid token",
  });
};

module.exports = authMiddleware;
