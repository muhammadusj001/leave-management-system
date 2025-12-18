const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    leaveDate: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ["Approved", "Rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
