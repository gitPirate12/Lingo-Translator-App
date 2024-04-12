import React from "react";
import "./Footer.css";
import footerImage from "./ImageFooter/logo.png"; // Lingo image for footer

function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={footerImage} alt="Lingo Logo" className="footer-logo" />
          </div>
          <div className="col-md-4">
            <h5 className="footer-title">HELP</h5>
            <ul className="footer-list">
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-title">Policies</h5>
            <ul className="footer-list">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
            <div className="footer-social">
              <a href="#"><i className="fa fa-facebook"></i>facebook</a>
              <a href="#"><i className="fa fa-twitter"></i>twitter</a>
              <a href="#"><i className="fa fa-instagram"></i>instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
