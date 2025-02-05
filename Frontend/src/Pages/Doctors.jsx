import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets";

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="doctors-container">
      <p className="doctors-title">Search Through Our Doctors' Specialist Array</p>
      <div className="doctors-content">
        {/* Left Side - Specialty Buttons */}
        <div className="specialty-buttons">
          <button
            className={speciality === 'General physician' ? 'active-button' : ''}
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
          >
            General Physician
          </button>
          <button
            className={speciality === 'Gynecologist' ? 'active-button' : ''}
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
          >
            Gynecologist
          </button>
          <button
            className={speciality === 'Dermatologist' ? 'active-button' : ''}
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
          >
            Dermatologist
          </button>
          <button
            className={speciality === 'Pediatricians' ? 'active-button' : ''}
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
          >
            Pediatricians
          </button>
          <button
            className={speciality === 'Neurologist' ? 'active-button' : ''}
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
          >
            Neurologist
          </button>
          <button
            className={speciality === 'Gastroenterologist' ? 'active-button' : ''}
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
          >
            Gastroenterologist
          </button>
        </div>
        
        {/* Right Side - Doctor List */}
        <div className="doctors-list">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              className="doctor-card"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              <img src={item.image} alt={`${item.name}`} className="doctor-image" />
              <div className="doctor-info">
                <div className="doctor-status">
                  <p className="status-indicator"></p>
                  <p className="availability">Available</p>
                </div>
                <p className="doctor-name">{item.name}</p>
                <p className="doctor-specialty">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
