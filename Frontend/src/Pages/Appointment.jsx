import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets, doctors } from '../assets/assets';
import RelatedDoctots from '../Components/RelatedDoctots';

function Appointment() {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Day index
  const [selectedTime, setSelectedTime] = useState(''); // Selected time
  const [selectedDate, setSelectedDate] = useState(''); // Selected date for booking confirmation

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const generateAvailableSlots = () => {
    setDocSlots([]); // Clear previous slots
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(now);
      currentDate.setDate(now.getDate() + i); // Increment day by `i`

      // Set start and end times for the day
      const isToday = i === 0;
      if (isToday) {
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
        currentDate.setHours(now.getHours() + (now.getMinutes() > 0 ? 1 : 0));
      } else {
        currentDate.setHours(8, 0, 0, 0);
      }

      const endTime = new Date(currentDate);
      endTime.setHours(18, 0, 0, 0); // End time: 6:00 PM

      // Generate time slots
      let timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    if (docInfo) {
      generateAvailableSlots();
    }
  }, [docInfo]);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment booked for ${selectedDate} at ${selectedTime}`);
    } else {
      alert('Please select a valid date and time.');
    }
  };

  return (
    <div className="appointment-container">
      {/* Doctor Details */}
      <div className="doctor-details">
        <div className="doctor-image-container">
          {docInfo && docInfo.image && (
            <img className="doctor-image" src={docInfo.image} alt="Doctor" />
          )}
        </div>
        <div className="doctor-info-container">
          {docInfo && (
            <>
              <p className="doctor-name">
                <img src={assets.verified_icon} alt="Verified" className="verified-icon" />
                {docInfo.name}
              </p>
              <p className="doctor-degree-speciality">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="experience-button">{docInfo.experience}</button>
              <div className="doctor-about">
                <p className="about-title">About</p>
                <p className="about-description">{docInfo.about}</p>
              </div>
              <p className="doctor-fee">
                Appointment Fee: <span>{docInfo.fees}</span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Booking Slots */}
      <div>
        <p>Booking Slots</p>
        <div className="days-container">
          {docSlots.map((slots, index) => {
            const date = slots[0]?.datetime;
            return (
              <div
                key={index}
                className={`day-item ${selectedDayIndex === index ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedDate(`${daysOfWeek[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`);
                  setSelectedTime(''); // Reset time selection when day changes
                }}
              >
                <p>{date && daysOfWeek[date.getDay()]}</p>
                <p>{date && date.getDate()}</p>
              </div>
            );
          })}
        </div>

        <div className="slots-container">
          {docSlots[selectedDayIndex]?.map((slot, index) => {
            const isDisabled = slot.datetime < new Date(); // Disable past slots
            return (
              <p
                key={index}
                className={`slot-item ${selectedTime === slot.time ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && setSelectedTime(slot.time)}
              >
                {slot.time.toLowerCase()}
              </p>
            );
          })}
        </div>

        <div className="booking-button-container">
          <button className="booking-button" onClick={handleBooking} disabled={!selectedTime}>
            Book Appointment
          </button>
        </div>
      </div>
    {/* Listing all the related Doctors  */}
    <RelatedDoctots docId={docId} speciality={docInfo?.speciality} />
    </div>
  );
}

export default Appointment;
