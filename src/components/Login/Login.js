// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useToken } from "../../TokenContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    axios
      .post(`${baseUrl}/user/login`, formData)
      .then((response) => {
        setToken(response.data.result.token);
        setMessage(response.data.message);
        localStorage.setItem("access", response.data.result.token);
        localStorage.setItem("refresh", response.data.result.token);

        console.log(localStorage);
        navigate("/home");
      })
      .catch((error) => {
        // setMessage(error.response.data.message);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
