import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* ------Left Section ---- */}
        <div className="footer-section footer-left">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut minima maxime fugiat, odio asperiores in ipsum optio, tempora esse aperiam cum nulla!
          </p>
        </div>

        {/* ------Center Section ---- */}
        <div className="footer-section footer-center">
          <p className="footer-heading">Company</p>
          <ul className="footer-links">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ------Right Section ---- */}
        <div className="footer-section footer-right">
          <p className="footer-heading">Get In Touch</p>
          <ul className="footer-contact">
            <li>+254723739502</li>
            <li>mochagabriel49@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Segment */}
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Mocha-Afya Bora. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
