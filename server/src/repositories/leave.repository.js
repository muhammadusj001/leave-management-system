const Leave = require("../models/Leave.model");

const createLeave = (data) => {
  return Leave.create(data);
};

const findLeavesByUser = (userId) => {
  return Leave.find({ employee: userId });
};

const findAllLeaves = () => {
  return Leave.find().populate("employee", "email role");
};

const updateLeaveStatus = (leaveId, status) => {
  return Leave.findByIdAndUpdate(
    leaveId,
    { status },
    { new: true }
  );
};

module.exports = {
  createLeave,
  findLeavesByUser,
  findAllLeaves,
  updateLeaveStatus,
};
