import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js'


function Register() {
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/register', user);
      navigate('/login')      
    } catch (error) {
      console.log(error)
    }

    if (user.password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Please Sign up to Book an appointment.</p>
      </div>
      <div className="form-group">
        <label htmlFor="full_name" className="form-label">Full Name:</label>
        <input
          type="text"
          placeholder="Enter your full name"
          name="full_name"
          value={user.full_name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          placeholder="Enter Valid Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
        <input
          type="password"
          placeholder="Re-enter password"
          name="confirm_password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="form-input"
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <button type="submit" className="form-button">Create Account</button>
      </div>
      <div className="form-footer">
        <p className="form-footer-text">
          Have an Account? <Link to="/login" className="form-link">Login Here</Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
