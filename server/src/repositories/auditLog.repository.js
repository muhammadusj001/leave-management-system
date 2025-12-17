const AuditLog = require("../models/AuditLog.model");

const createAuditLog = (data) => {
  return AuditLog.create(data);
};

module.exports = {
  createAuditLog,
};
