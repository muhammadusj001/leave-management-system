const { body } = require("express-validator");

const applyLeaveValidator = [
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required"),

  body("employeeName")
    .notEmpty()
    .withMessage("Employee Name is required"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("reason")
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 3 })
    .withMessage("Reason must be at least 3 characters"),
];

module.exports = {
  applyLeaveValidator,
};
