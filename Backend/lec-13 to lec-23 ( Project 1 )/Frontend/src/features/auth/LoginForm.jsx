import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style/form.scss";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login", {
      email,
      password
    }, {
      withCredentials: true
    })
    .then((response) => {
      console.log("Login successful", response.data);
    })
    .catch((error) => {
      console.error("Login failed", error.response?.data);
    });
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__logo">Instagram</h1>

        <form className="auth__form" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>
      </div>

      <div className="auth__switch">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;