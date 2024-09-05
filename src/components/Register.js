import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../hooks/createUser";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    passwordConfirm: "",
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
    if (user.password === user.passwordConfirm) {
      try {
        const response = await createUser(user.userName, user.password);

        // Vérifier l'état de la réponse
        if (response.result.status === "failure") {
          setMessage("Username already exists");
          console.log("Username already exists");
        } else {
          setMessage(response.result.message);
          navigate("/");
          console.log("User created successfully!", response);
        }
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        setMessage(
          "An error occurred while creating the user. Please try again."
        );
      }
    } else {
      setMessage("Passwords do not match");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-control">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            required
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
            value={user.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
      <p>
        Have an account? <Link to="/">Go to login.</Link>
      </p>
    </div>
  );
}

export default Register;
