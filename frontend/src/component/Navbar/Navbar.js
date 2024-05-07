import React, { useState } from "react";
import { Link } from "react-router-dom";
import image_navlogo from "./NavImage/logo.jpg";
import image1_userlogo from "./NavImage/user.png";
import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  // Function to handle link click
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName === activeLink ? "" : linkName);
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src={image_navlogo} alt="App logo" />
            <div className="navbar-title"><b>LINGO Translator</b></div>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* Your navigation links */}
          </ul>
          <div className="navbar-profile">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={image1_userlogo} alt="User photo" className="profile-image" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div>
                  <li><Link className="dropdown-item" to="/user-profile">View User Profile</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                </div>
                <div>
                  <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                  <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>  
                </div>
                 
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
