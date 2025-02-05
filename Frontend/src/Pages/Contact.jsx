import React from 'react';
import { assets } from '../assets/assets';

function Contact() {
  return (
    <div className="contact-page-container">
      {/* Header Section */}
      <div className="contact-header">
        <p className="contact-title">
          Contact <span className="contact-title-highlight">Us</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="contact-content">
        {/* Left Side - Image */}
        <div className="contact-image-container">
          <img
            className="contact-image"
            src={assets.contact_image}
            alt="Contact Us"
          />
        </div>

        {/* Right Side - Contact Details */}
        <div className="contact-details-container">
          <div className="office-details">
            <b className="contact-section-title">Our Office Location</b>
            <p className="contact-address">123 Nairobi Street, Nairobi, Kenya</p>
            <p className="contact-phone">Phone: +254 723 739 502</p>
            <p className="contact-email">Email: info@mochagabriel.com</p>
          </div>

          {/* Careers Section */}
          <div className="careers-details">
            <b className="contact-section-title">Careers</b>
            <p className="careers-description">
              Get to know more about our job openings and join our team.
            </p>
            <button className="explore-jobs-button">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
