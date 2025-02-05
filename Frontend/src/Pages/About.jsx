import React from 'react';
import { assets } from '../assets/assets';

function About() {
  return (
    <div className="about-page-container">
      {/* Header Section */}
      <div className="about-header">
        <p className="about-title">
          About <span className="about-title-highlight">Us</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="about-content">
        {/* Left Side - Image */}
        <div className="about-image-container">
          <img className="about-image" src={assets.about_image} alt="About Us" />
        </div>

        {/* Right Side - Text */}
        <div className="about-text-container">
          <p className="about-paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat voluptatem ea voluptates pariatur ex fuga
            nesciunt natus impedit quam cum ipsum reprehenderit enim eaque officia, consequuntur praesentium totam
            dolore exercitationem.
          </p>
          <p className="about-paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis esse nesciunt, dolorum enim mollitia,
            temporibus atque, hic similique sed quam quidem. Nihil possimus officiis natus corporis. Iste, nobis dolor?
          </p>
          <b className="about-vision-title">Our Vision</b>
          <p className="about-paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quam fugit necessitatibus corrupti
            exercitationem vitae nihil sed magnam nesciunt natus. Inventore praesentium unde incidunt doloremque
            voluptatibus illum labore ratione maxime?
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us-header">
        <p className="why-choose-title">
          Why <span className="why-choose-highlight">Choose Us</span>
        </p>
      </div>
      <div className="why-choose-us">
        <div className="why-choose-item">
          <b className="why-choose-item-title">Trustable</b>
          <p className="why-choose-item-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore modi nam pariatur dolorem! Provident
            possimus expedita ipsa consectetur modi officia.
          </p>
        </div>
        <div className="why-choose-item">
          <b className="why-choose-item-title">Efficiency</b>
          <p className="why-choose-item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, minima.
          </p>
        </div>
        <div className="why-choose-item">
          <b className="why-choose-item-title">Affordable</b>
          <p className="why-choose-item-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti saepe omnis aliquid error sunt magnam
            recusandae.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
