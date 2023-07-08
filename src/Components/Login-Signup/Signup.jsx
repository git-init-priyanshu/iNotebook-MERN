import React, { useState, useContext } from "react";
// import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../../Context/notes/NoteContext";
import "./css/style.css";
import "./css/signup.css";

export default function Signup() {
  // Alert
  const context = useContext(noteContext);
  const { showAlert } = context;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const navigate = useNavigate();

  const host = "http://localhost:5000/";

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (credentials.cPassword !== credentials.password) {
      alert("Password does not match");
    }
    const response = await fetch(`${host}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save the authToken and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Account created successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };

  return (
    <div className="signup-page">
      <div className="form">
        <div className="header">
          <h1>SIGNUP</h1>
        </div>
        {/* <div className="logo">
          <div className="img"></div>
          <p>iChat</p>
        </div> */}
        <form
          className="register-form"
          autoComplete="off"
          onClick={handleOnSubmit}
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleOnChange}
            value={credentials.name}
            required
            minLength={3}
          />
          <input
            type="email"
            placeholder="email address"
            name="email"
            onChange={handleOnChange}
            value={credentials.email}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleOnChange}
            value={credentials.password}
            required
            minLength={5}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="cpassword"
            onChange={handleOnChange}
            value={credentials.cPassword}
            required
            minLength={5}
          />
          <button type="submit">create</button>
          <p className="message">
            Already registered? <Link href="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
