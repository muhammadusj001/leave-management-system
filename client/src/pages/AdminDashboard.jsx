import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard({ onLogout }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pending leave requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/api/leaves/pending");
      setRequests(res.data);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);

      await api.put(`/api/leaves/${id}/status`, {
        status,
      });

      fetchRequests();
      toast.success(`Leave ${status.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("updateStatus error:", err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="admin-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1 className="admin-title">Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* REQUEST TABLE WRAPPER */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No pending requests
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.employeeId || "-"}</td>
                  <td>{req.employeeName || "-"}</td>
                  <td>{req.startDate ? new Date(req.startDate).toLocaleDateString() : "-"}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          disabled={loading}
                          onClick={() =>
                            updateStatus(req._id, "Approved")
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          disabled={loading}
                          onClick={() =>
                            updateStatus(req._id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
