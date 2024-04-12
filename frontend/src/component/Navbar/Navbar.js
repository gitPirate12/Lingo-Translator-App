import React from "react";
import { Link } from "react-router-dom";
import image_navlogo from "./NavImage/logo.png";
import image1_userlogo from "./NavImage/user.png"; 
import "./Navbar.css";


function Navbar() {
  return (
    
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src={image_navlogo} alt="App logo" />
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
          <ul className="navbar-ul">
            <li className="nav-item">
              <Link to="/Rash_fade" className="nav-link">World Translator</Link>
            </li>
            <li className="nav-item">
              <Link to="/emojiText" className="nav-link">Emoji-Text Translator</Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link">Community</Link>
            </li>
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
                <img src= {image1_userlogo} alt="User photo" className="profile-image" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/user-profile">View User Profile</Link></li>
                <li><Link className="dropdown-item" to="/logout">Log Out</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
