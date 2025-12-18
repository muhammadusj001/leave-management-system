import { useEffect, useState } from "react";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // 🔁 Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);

    // persist role
    localStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (role === "employee") {
    return <EmployeeDashboard onLogout={handleLogout} />;
  }

  if (role === "admin") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // safety fallback
  return <Login onLogin={handleLogin} />;
}
