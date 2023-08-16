import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  let history = useNavigate();
  const [creds, setCreds] = useState({ name:"", email: "", password: "" });
  const hostname = "http://localhost:5000";
  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Submitted");
    const response = await fetch(`${hostname}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:creds.name, email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      props.showAlert("success","Welcome User!")
      localStorage.setItem("token", json.authtoken)
      history("/login")
    } else {
      props.showAlert("danger", "something went wrong!")
    }
  };
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
    // console.log("changed");
  };
  return (
    <div>
      Signup Here!
      <form onSubmit={loginSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={creds.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={creds.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={creds.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
