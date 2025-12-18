const leaveService = require("../services/leave.service");

const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, employeeId, employeeName } = req.body;
    const leave = await leaveService.applyLeave(
      req.user.userId,
      startDate,
      endDate,
      reason,
      employeeId,
      employeeName
    );
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getMyLeaves(req.user.userId);
    res.json(leaves);
  } catch (error) {
    console.error("getMyLeaves error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getPendingLeaves();
    res.json(leaves);
  } catch (error) {
    console.error("getPendingLeaves error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();
    res.json(leaves);
  } catch (error) {
    console.error("getAllLeaves error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await leaveService.changeLeaveStatus(
      req.params.id,
      status,
      req.user.userId
    );

    res.json(leave);
  } catch (error) {
    console.error("updateLeaveStatus error:", error);
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  applyLeave,
  getMyLeaves,
  getPendingLeaves,
  getAllLeaves,
  updateLeaveStatus,
};
