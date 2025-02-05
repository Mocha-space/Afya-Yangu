import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api.js"; 

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token")); // Retrieve token from localStorage

  const handleLogout = async () => {
    try {
      const response = await api.post("user/logout"); // Make the logout API call
      alert(response.data.message);

      // Clear the token
      localStorage.removeItem("token"); // Remove token from storage
      setToken(null); // Update state to reflect logged-out status

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar-container">
      <Link to="/">
        <img src={assets.logo} alt="Hospital Logo" className="navbar-logo" />
      </Link>

      <ul className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link navbar-link-active" : "navbar-link"
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "navbar-link navbar-link-active" : "navbar-link"
          }
        >
          <li>Our Doctors</li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "navbar-link navbar-link-active" : "navbar-link"
          }
        >
          <li>About</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "navbar-link navbar-link-active" : "navbar-link"
          }
        >
          <li>Contact</li>
        </NavLink>
      </ul>

      <div className="navbar-account">
        {token ? (
          <div className="profile-dropdown">
            <img src={assets.profile_pic} alt="Profile" className="profile-pic" />
            <img src={assets.dropdown_icon} alt="Dropdown Icon" className="dropdown-icon" />
            <div className="dropdown-menu">
              <p onClick={() => navigate("/my-profile")}>My Profile</p>
              <p onClick={() => navigate("/my-appointments")}>My Appointments</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        ) : (
          <button
            className="btn-primary"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
