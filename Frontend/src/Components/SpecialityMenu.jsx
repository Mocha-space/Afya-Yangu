import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

function SpecialityMenu() {
  return (
    <div id="speciality" className="speciality-container">
      <h1 className="speciality-title">Find your Doctor by Speciality.</h1>
      <p className="speciality-description">
        Just have a look or browse through our trusted doctors and book your
        slot now.
      </p>
      <div className="speciality-items">
        {specialityData.map((item, index) => (
          <Link key={index} to={`/doctors/${item.speciality}`} className="speciality-item">
            <img src={item.image} alt={item.speciality} className="speciality-image" />
            <p className="speciality-name">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
