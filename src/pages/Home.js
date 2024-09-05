import React from "react";
import Login from "../components/Login";
import ServerStatus from "../components/ServerStatus";

function Home() {
  return (
    <>
      <div
        style={{
          margin: "20px 50px",
          position: "absolute",
          top: "2%",
          right: "2%",
        }}
      >
        <ServerStatus />
      </div>
      <Login />
    </>
  );
}

export default Home;
