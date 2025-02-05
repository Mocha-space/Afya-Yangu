import React, { useEffect, useState } from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

function RelatedDoctots({docId, speciality}) {

  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors,docId, speciality])

  return (
    <div className="top-doctors-container">
    <h1 className="top-doctors-title">Other Related Doctors</h1>
    <p className="top-doctors-description">Find More Doctors of the Speciality you are searching for.</p>
    
    <div className="top-doctors-grid">
      {relDoc.slice(0, 5).map((item, index) => (
        <div className="doctor-card" key={index} onClick={() => {navigate(`/appointment/${item._id}`) ; scrollTo(0,0)}}>
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
  </div>
  )
}

export default RelatedDoctots