import React, { useState } from "react";
import "./dashord.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Content from "../components/Content";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État pour contrôler la visibilité de la sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Bascule la visibilité de la sidebar
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
