import React from 'react';
import { doctors } from '../assets/assets';

function MyAppointments() {
  return (
    <div className="appointments-container">
      <h2 className="appointments-title">My Appointments</h2>
      <div className="appointments-list">
        {doctors.slice(0, 3).map((item, index) => (
          <div key={index} className="appointment-card">
            <div className="appointment-image">
              <img src={item.image} alt="Doctor" />
            </div>
            <div className="appointment-details">
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
              <b className="doctor-address-title">Address</b>
              <p className="doctor-address">{item.address.line1}</p>
              <p className="appointment-date-time">
                <span>Date & Time:</span> 18, Nov, 2024 | 8:30 AM
              </p>
            </div>
            <div className="appointment-actions">
              <button className="cancel-button">Cancel Appointment</button>
              <button className="pay-button">Online Pay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
