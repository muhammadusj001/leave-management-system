const leaveRepository = require("../repositories/leave.repository");
const auditLogRepository = require("../repositories/auditLog.repository");

const applyLeave = async (userId, startDate, endDate, reason, employeeId, employeeName) => {
  // Check if startDate is in the past
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    throw new Error("Cannot apply leave for past dates");
  }

  if (new Date(endDate) < new Date(startDate)) {
    throw new Error("End date cannot be before start date");
  }

  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return leaveRepository.createLeave({
    employee: userId,
    employeeId,
    employeeName,
    startDate,
    endDate,
    totalDays,
    reason,
  });
};

const getMyLeaves = (userId) => {
  return leaveRepository.findLeavesByUser(userId);
};

const getPendingLeaves = () => {
  return leaveRepository.findPendingLeaves();
};

const getAllLeaves = () => {
  return leaveRepository.findAllLeaves();
};

const changeLeaveStatus = async (leaveId, status, adminId) => {
  console.log("changeLeaveStatus called with:", { leaveId, status, adminId });
  
  const updatedLeave = await leaveRepository.updateLeaveStatus(
    leaveId,
    status
  );

  if (!updatedLeave) {
    throw new Error("Leave not found");
  }

  try {
    await auditLogRepository.createAuditLog({
      admin: adminId,
      leave: leaveId,
      action: status,
    });
  } catch (err) {
    console.log("Audit log creation failed (non-critical):", err.message);
  }

  return updatedLeave;
};


module.exports = {
  applyLeave,
  getMyLeaves,
  getPendingLeaves,
  getAllLeaves,
  changeLeaveStatus,
};
