import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isConnected = await axios.get(
        `http://greenvelvet.alwaysdata.net/bugTracker/api/login/${user.userName}/${user.password}`
      );
      if (isConnected.data.result.status === "failure") {
        setMessage(isConnected.data.result.message);
      } else {
        localStorage.setItem("token", isConnected.data.result.token);
        localStorage.setItem("userID", isConnected.data.result.id);
        localStorage.setItem("userName", user.userName);
        console.log("connected");
        navigate("/dashboard");
      }
      console.log(isConnected);
    } catch (error) {}
  };
  return (
    <>
      <div className="auth-container">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-control">
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        don't have an account <Link to={"/signup"}>go to Sign up.</Link>
      </div>
    </>
  );
}

export default Login;
