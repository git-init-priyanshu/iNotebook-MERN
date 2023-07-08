import React, { useState, useContext } from "react";
// import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../../Context/notes/NoteContext";
import "./css/style.css";
import "./css/login.css";

export default function Login() {
  // Alert
  const context = useContext(noteContext);
  const { showAlert } = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const host = "http://localhost:5000/";

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save the authToken and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Logged in successfully", "success");
    } else {
      showAlert("Invalid credentials", "danger");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <div className="header">
          <h1>LOGIN</h1>
        </div>
        {/* <div className="logo">
          <div className="img"></div>
          <p>iChat</p>
        </div> */}
        <form className="login-form" onSubmit={handleOnSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
          />
          <button type="submit">login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
