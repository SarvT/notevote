import React from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  React.useEffect(() => {
    // Google Analytics
    // ga("send", "pageview");
    console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          NoteVote
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-bs-toggle="collapse"
          data-bs-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <>
              <Link className="btn btn-primary" to={"/login"} role="button">
                Login
              </Link>
              <Link
                className="btn btn-primary mx-2"
                to={"/signup"}
                role="button"
              >
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-primary mx-2" onClick={userLogout} role="button">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
