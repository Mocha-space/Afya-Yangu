import React from 'react';
import { assets } from '../assets/assets';

function Banner() {
  return (
    <div className="banner-container">
      {/* ------------Left Side */}
      <div className="banner-left">
        <div className="banner-text">
          <p className="banner-heading">Book Your Slot With Mocha's Doctors Today</p>
          <p className="banner-subheading">And enjoy over 100+ Top-Notch Doctors Today</p>
        </div>
        <button className="banner-button">Create Account</button>
      </div>

      {/* ------------Right Side */}
      <div className="banner-right">
        <div className="banner-image-container">
          <img src={assets.appointment_img} alt="Appointment" className="banner-image" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
