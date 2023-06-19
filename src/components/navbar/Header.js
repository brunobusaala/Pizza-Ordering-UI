import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
    <div className="logo">
        <Link to="/">PizzaMtaani</Link>
      </div>  
      <div className="nav-items">
        <div className="nav-item">
          <Link to="/cart">Cart</Link>
        </div>
        <div className="nav-item">
          <Link to="/contact">Contacts</Link>
        </div>
        <div className="nav-item">
          <Link to="/addpizza">Add</Link>
        </div>
        <div className="nav-item">
          <Link to="/deletepizza">Delete</Link>
        </div>
        
      </div>

      <Outlet />
    </nav>
  );
};

export default Header;
