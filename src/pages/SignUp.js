import React from "react";
import Register from "../components/Register";
import ServerStatus from "../components/ServerStatus";

function SignUp() {
  return (
    <>
      <div
        style={{
          margin: "20px 50px",
        }}
      >
        <ServerStatus />
      </div>
      <Register />
    </>
  );
}

export default SignUp;
