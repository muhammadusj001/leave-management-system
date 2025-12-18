const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const leaveController = require("../controllers/leave.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const { applyLeaveValidator } = require("../validators/leave.validator");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Employee"),
  applyLeaveValidator,
  validationMiddleware,
  leaveController.applyLeave
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("Employee"),
  leaveController.getMyLeaves
);

router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("Admin"),
  leaveController.getPendingLeaves
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware("Admin"),
  leaveController.getAllLeaves
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("Admin"),
  leaveController.updateLeaveStatus
);

module.exports = router;
