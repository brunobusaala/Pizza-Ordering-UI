import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  //Retrieve the Jwt token from storage mechanism
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) !== null;

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("user");
    // Perform any necessary action after logout
    // For example, redirect to the login page
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          Pizza<span style={{ color: "red" }}>Mtaani</span>
        </Link>
      </div>
      <div className="nav-items align-items-center">
        {isLoggedIn ? (
          <>
            <div className="nav-item">
              <Link to="/cart">Cart</Link>
            </div>
            {/* <div className="nav-item">
              <Link to="/contact">Contacts</Link>
            </div> */}
            {/* <div className="nav-item">
              <Link to="/addpizza">Add</Link>
            </div> */}
            {/* <div className="nav-item">
              <Link to="/deletepizza">Delete</Link>
            </div> */}
            <div className="nav-items">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <div className="nav-item">
                <Link to="/login">Login</Link>
              </div>
            )}
            {location.pathname !== "/register" && (
              <div className="nav-item">
                <Link to="/register">Register</Link>
              </div>
            )}
          </>
        )}
      </div>

      <Outlet />
    </nav>
  );
};

export default Header;
