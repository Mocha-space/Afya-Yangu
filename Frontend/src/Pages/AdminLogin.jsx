import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';  


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Used for redirecting

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/admin/login', { email, password });

      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="form-footer-text">
          Patient? <Link to="/login" className="form-link">Login Here</Link>
        </p>
    </div>
  );
};

export default AdminLogin;
