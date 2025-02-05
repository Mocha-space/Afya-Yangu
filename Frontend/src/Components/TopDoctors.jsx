import React, { useContext } from 'react';
import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../Context/AppContext';

function TopDoctors() {

  // const {doctors} = useContext(AppContext)

  const navigate = useNavigate()
  const handleShowMore = () => {
    navigate('/doctors')
  }


  return (
    <div className="top-doctors-container">
      <h1 className="top-doctors-title">Mocha's Top Doctors</h1>
      <p className="top-doctors-description">Just browse through our array of doctors with hassle-free.</p>
      
      <div className="top-doctors-grid">
        {doctors.slice(0, 10).map((item, index) => (
          <div className="doctor-card" key={index} onClick={() => navigate(`/appointment/${item._id}`)}>
            <img src={item.image} alt="Doctor" className="doctor-image" />
            <div className="doctor-info">
              <div className="doctor-status">
                <p></p>
                <p className="doctor-availability">Available</p>
              </div>
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="show-more-btn" onClick={handleShowMore}>Show More</button>
    </div>
  );
}

export default TopDoctors;
