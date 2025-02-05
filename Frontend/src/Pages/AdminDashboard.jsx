import React, { useEffect, useState } from 'react';
import Doctors from './Doctors';

import api from '../api';


const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDoctor, setNewDoctor] = useState({ name: '', speciality: '', address: '', bio: '', image: '' });
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors-list');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, appointmentsRes] = await Promise.all([
          api.get('/admin/doctors'),
          api.get('/admin/appointments'),
        ]);
        setDoctors(doctorsRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, [name]: value });
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const addDoctor = async () => {
    try {
      const res = await api.post('/admin/doctors', newDoctor);
      setDoctors([...doctors, { ...newDoctor, id: res.data.id }]);
      setNewDoctor({ name: '', speciality: '', address: '', bio: '', image: '' });
    } catch (err) {
      console.error('Failed to add doctor:', err);
    }
  };

  const updateDoctor = async () => {
    try {
      await api.put(`/admin/doctors/${editingDoctor.id}`, editingDoctor);
      setDoctors(doctors.map((doc) => (doc.id === editingDoctor.id ? editingDoctor : doc)));
      setEditingDoctor(null);
    } catch (err) {
      console.error('Failed to update doctor:', err);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await api.delete(`/admin/doctors/${id}`);
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error('Failed to delete doctor:', err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.put(`/admin/appointments/${id}`, { status: 'Cancelled' });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: 'Cancelled' } : appt
        )
      );
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-dashboard__sidebar">
        <button onClick={() => setActiveTab('doctors-list')} className={`admin-dashboard__button ${activeTab === 'doctors-list' ? 'active' : ''}`}>Doctors List</button>
        <button onClick={() => setActiveTab('manage-doctors')} className={`admin-dashboard__button ${activeTab === 'manage-doctors' ? 'active' : ''}`}>Manage Doctors</button>
        <button onClick={() => setActiveTab('appointments')} className={`admin-dashboard__button ${activeTab === 'appointments' ? 'active' : ''}`}>Show Appointments</button>
        {/* Add other buttons for more sections if needed */}
      </aside>
      <main className="admin-dashboard__main">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
        {activeTab === 'doctors-list' && <Doctors />}
        {activeTab === 'manage-doctors' && (
          <div className="admin-dashboard__section">
            <h2 className="admin-dashboard__section-title">Manage Doctors</h2>
            <div className="admin-dashboard__form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editingDoctor ? editingDoctor.name : newDoctor.name}
                onChange={handleInputChange}
                className="admin-dashboard__input"
              />
              <input
                type="text"
                name="speciality"
                placeholder="Speciality"
                value={editingDoctor ? editingDoctor.speciality : newDoctor.speciality}
                onChange={handleInputChange}
                className="admin-dashboard__input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={editingDoctor ? editingDoctor.address : newDoctor.address}
                onChange={handleInputChange}
                className="admin-dashboard__input"
              />
              <input
                type="text"
                name="bio"
                placeholder="Bio"
                value={editingDoctor ? editingDoctor.bio : newDoctor.bio}
                onChange={handleInputChange}
                className="admin-dashboard__input"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={editingDoctor ? editingDoctor.image : newDoctor.image}
                onChange={handleInputChange}
                className="admin-dashboard__input"
              />
              <button onClick={editingDoctor ? updateDoctor : addDoctor} className="admin-dashboard__button">
                {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
              </button>
            </div>
            <ul className="admin-dashboard__list">
              {doctors.map((doc) => (
                <li key={doc.id} className="admin-dashboard__item doctor-item">
                  {doc.name} ({doc.speciality})
                  <button onClick={() => setEditingDoctor(doc)} className="admin-dashboard__button">
                    Edit
                  </button>
                  <button onClick={() => deleteDoctor(doc.id)} className="admin-dashboard__button admin-dashboard__button--delete">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'appointments' && (
          <div className="admin-dashboard__section">
            <h2 className="admin-dashboard__section-title">Appointments</h2>
            <ul className="admin-dashboard__list">
              {appointments.map((appt) => (
                <li key={appt.id} className="admin-dashboard__item appointment-item">
                  {appt.user_name} booked {appt.doctor_name} on {appt.appointment_date} -{' '}
                  {appt.payment_status} ({appt.status})
                  {appt.status !== 'Cancelled' && (
                    <button onClick={() => cancelAppointment(appt.id)} className="admin-dashboard__button admin-dashboard__button--cancel">
                      Cancel
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
