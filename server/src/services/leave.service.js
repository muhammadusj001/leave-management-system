const leaveRepository = require("../repositories/leave.repository");
const auditLogRepository = require("../repositories/auditLog.repository");


const applyLeave = async (userId, startDate, endDate, reason) => {
  if (new Date(endDate) < new Date(startDate)) {
    throw new Error("End date cannot be before start date");
  }

  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return leaveRepository.createLeave({
    employee: userId,
    startDate,
    endDate,
    totalDays,
    reason,
  });
};

const getMyLeaves = (userId) => {
  return leaveRepository.findLeavesByUser(userId);
};

const getAllLeaves = () => {
  return leaveRepository.findAllLeaves();
};

const changeLeaveStatus = async (leaveId, status, adminId) => {
  const updatedLeave = await leaveRepository.updateLeaveStatus(
    leaveId,
    status
  );

  await auditLogRepository.createAuditLog({
    admin: adminId,
    leave: leaveId,
    action: status,
  });

  return updatedLeave;
};


module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  changeLeaveStatus,
};
