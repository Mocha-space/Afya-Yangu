import React, { useState, useEffect } from "react";
import api from "../api.js";

function MyProfile() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "",
    date_of_birth: "",
    profile_image: "https://via.placeholder.com/150", // Default image URL
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/my-profile"); // Corrected endpoint
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Format date_of_birth before sending to the server
      const formattedData = {
        ...userData,
        date_of_birth: new Date(userData.date_of_birth).toISOString().split("T")[0],
      };

      await api.put("/user/my-profile", formattedData);
      alert("Profile updated successfully!");
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.profile_image}
          alt="Profile"
          className="profile-image"
        />
        {isEdit ? (
          <input
            type="text"
            name="full_name"
            value={userData.full_name}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <p className="profile-name">{userData.full_name}</p>
        )}
        <button onClick={() => (isEdit ? handleSave() : setIsEdit(true))} className="edit-button">
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="contact-info">
          <p>Email:</p>
          <p className="info-value">{userData.email}</p>

          <p>Phone:</p>
          {isEdit ? (
            <input
              type="text"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p className="info-value">{userData.phone_number}</p>
          )}

          <p>Address:</p>
          {isEdit ? (
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p className="info-value">{userData.address}</p>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Basic Information</h3>
        <div className="basic-info">
          <p>Gender:</p>
          {isEdit ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="profile-select"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="info-value">{userData.gender}</p>
          )}

          <p>Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              name="date_of_birth"
              value={userData.date_of_birth}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p className="info-value">{userData.date_of_birth}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
