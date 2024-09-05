import React, { useEffect, useState } from "react";
import { isConnected } from "../hooks/isConnected";

const ConnectionStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await isConnected();
      setStatus(result);
    };

    const intervalId = setInterval(fetchStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span>Server Status: </span>
      <span className={status === "OK" ? "connected" : "disconnected"}></span>
    </div>
  );
};

export default ConnectionStatus;
