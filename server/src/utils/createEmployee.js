const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User.model");

const createEmployee = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("employee123", 10);

    await User.create({
      email: "employee@lms.com",
      password: hashedPassword,
      role: "Employee",
    });

    console.log("✅ Employee created");
    console.log("Email: employee@lms.com");
    console.log("Password: employee123");

    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createEmployee();
