import React from "react";
import "./Header.css"; // Create a separate CSS file for Header styles
import ConnectionStatus from "./ServerStatus";

const Header = () => {
  const userName = localStorage.getItem("userName");
  return (
    <header className="header">
      <ConnectionStatus />
      <h1>My Dashboard</h1>
      <div className="user-info">
        <img
          src="https://via.placeholder.com/30"
          alt="User"
          className="user-avatar"
        />
        <span>{userName}</span>
      </div>
    </header>
  );
};

export default Header;
