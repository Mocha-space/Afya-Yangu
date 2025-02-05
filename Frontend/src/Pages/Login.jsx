import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';  // Import useNavigate hook
import api from '../api.js'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate for redirect

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await api.post('user/login', user); // assuming login API is correct
      const token = response.data.token;  // Assuming backend returns JWT token

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Navigate to MyProfile page
      navigate('/my-profile');
    } catch (error) {
      setError('Login failed!');
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Login</h2>
        <p className="form-subtitle">Please Login to Book an appointment.</p>
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
        <button type="submit" className="form-button">Login</button>
      </div>
      <div className="form-footer">
        <p className="form-footer-text">
          Don't Have an Account? <Link to="/register" className="form-link">Register Here</Link>
        </p>
        <p className="form-footer-text">
          An Admin? <Link to="/admin/login" className="form-link">Login Here</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
