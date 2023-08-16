import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let history = useNavigate();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const hostname = "http://localhost:5000";
  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Submitted");
    const response = await fetch(`${hostname}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      props.showAlert("success","Welcome User!")
      localStorage.setItem("token", json.authtoken)
      history("/")
    } else {
      props.showAlert("danger", "something went wrong!")
    }
  };
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
    console.log("changed");
  };

  return (
    <div>
      Login Here!
      {/* <form onSubmit={loginSubmit}>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            value={creds.email}
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            value={creds.password}
            id="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form> */}
      <form onSubmit={loginSubmit}>
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
  );
}
