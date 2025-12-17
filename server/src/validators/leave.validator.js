const { body } = require("express-validator");

const applyLeaveValidator = [
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
    .isLength({ min: 5 })
    .withMessage("Reason must be at least 5 characters"),
];

module.exports = {
  applyLeaveValidator,
};
