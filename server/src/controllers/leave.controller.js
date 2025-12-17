const leaveService = require("../services/leave.service");

const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = await leaveService.applyLeave(
      req.user.userId,
      startDate,
      endDate,
      reason
    );
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyLeaves = async (req, res) => {
  const leaves = await leaveService.getMyLeaves(req.user.userId);
  res.json(leaves);
};

const getAllLeaves = async (req, res) => {
  const leaves = await leaveService.getAllLeaves();
  res.json(leaves);
};

const updateLeaveStatus = async (req, res) => {
  const { status } = req.body;

  const leave = await leaveService.changeLeaveStatus(
    req.params.id,
    status,
    req.user.userId
  );

  res.json(leave);
};


module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
};
