import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/form.scss";
import axios from "axios";

const RegistrationForm = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault(); // stop page reload

    // if (!username || !email || !password) {
    //   alert("All fields are required");
    //   return;
    // }

    axios.post("http://localhost:3000/api/auth/register", {
      user: username,
      email,
      password
    }, {
        withCredentials: true // include cookies for session management
    }).then((response) => {
      console.log("Registration successful", response.data);
    }).catch((error) => {
      console.error("Registration failed", error);
    });

  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__logo">Instagram</h1>

        <form className="auth__form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="auth__switch">
        Already have an account?
        <Link to="/"> Log in</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;