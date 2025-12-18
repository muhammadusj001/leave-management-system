import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard({ onLogout }) {
  const [leaves, setLeaves] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch employee leaves
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/api/leaves/my");
      setLeaves(res.data);
    } catch {
      toast.error("Failed to load leaves");
    }
  };

  const handleSubmit = async () => {
    if (!date || !reason || !employeeId || !employeeName) {
      toast.warning("Please fill all fields");
      return;
    }

    // Check if date is in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("You cannot apply leave for past dates. Please select today or a future date.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/leaves", {
        startDate: date,
        endDate: date,
        reason,
        employeeId,
        employeeName,
      });

      setDate("");
      setReason("");
      setEmployeeId("");
      setEmployeeName("");
      setShowPopup(false);
      fetchLeaves();
      toast.success("Leave applied successfully!");
    } catch {
      toast.error("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="employee-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="employee-title">Employee Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* APPLY LEAVE */}
      <button className="apply-btn" onClick={() => setShowPopup(true)}>
        Apply Leave
      </button>

      {/* LEAVE TABLE WRAPPER */}
      <div className="employee-table-wrapper">
        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No leave records found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.employeeId || "-"}</td>
                  <td>{leave.employeeName || "-"}</td>
                  <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Apply Leave</h2>

            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="popup-actions">
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
