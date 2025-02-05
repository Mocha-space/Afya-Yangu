import React from "react";
import { assets } from "../assets/assets";

function Header() {
  return (
    <div className="header-container">
      {/* ---------------Left Side */}
      <div className="header-left">
        <p className="header-title">
          Mocha Doctors Are Trusted <br /> Book One Today.
        </p>
        <div className="header-description-container">
          <img
            src={assets.group_profiles}
            alt="Group of Doctors"
            className="header-img"
          />
          <p className="header-description">
            Take your time and have a look at our array <br />
            of top-notch doctors with hassle-free.
          </p>
          <a href="#speciality">
          <button className="book-appointment-btn">
            Book Appointment{" "}
            <img src={assets.arrow_icon} className="arrow-icon" />
          </button>
            </a> 
        </div>
      </div>
      {/* ---------Right Side */}
      <div className="header-right">
        <img
          src={assets.header_img}
          alt="Header Image"
          className="header-main-img"
        />
      </div>
    </div>
  );
}

export default Header;
