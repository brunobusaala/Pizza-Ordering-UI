import React, { useEffect } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  useEffect(() => {
    console.log("Current user:", currentUser);
    console.log("Is logged in:", currentUser?.userName);
  }, [currentUser, isLoggedIn, location.pathname]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          Pizza<span style={{ color: "red" }}>Mtaani</span>
        </Link>
      </div>
      <div className="nav-items align-items-center">
        {currentUser ? (
          <>
            <div className="nav-item">
              <Link to="/cart">Cart</Link>
            </div>
            <div className="nav-items">
              <Link to="/profile">Profile</Link>
            </div>
            {currentUser && (
              <>
                <div className="nav-items">
                  <Link to="/addpizza">Add Pizza</Link>
                </div>
                <div className="nav-items">
                  <Link to="/deletepizza">Manage Pizzas</Link>
                </div>
              </>
            )}
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
