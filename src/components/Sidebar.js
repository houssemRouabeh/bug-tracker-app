import React from "react";
import "./Sidebar.css";
import { logout } from "../hooks/logout";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logout(token);
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    }
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <ul>
          <li key="home" onClick={() => navigate("/dashboard")}>
            Home
          </li>
          <li key="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
