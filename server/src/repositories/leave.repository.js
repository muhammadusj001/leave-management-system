const Leave = require("../models/Leave.model");

const createLeave = (data) => {
  return Leave.create(data);
};

const findLeavesByUser = (userId) => {
  return Leave.find({ employee: userId }).sort({ createdAt: -1 });
};

const findPendingLeaves = () => {
  return Leave.find({ status: "Pending" }).sort({ createdAt: -1 });
};

const findAllLeaves = () => {
  return Leave.find().sort({ createdAt: -1 });
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
  findPendingLeaves,
  findAllLeaves,
  updateLeaveStatus,
};
