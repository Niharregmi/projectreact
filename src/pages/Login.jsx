
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'staff'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // Save token to local storage
      localStorage.setItem('token', data.token);

      // Navigate to the correct dashboard
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/staff/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Sign in to your WorkNest account
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="role">Login As</label>
            <select 
              id="role" 
              name="role" 
              className="form-control" 
              value={formData.role} 
              onChange={handleInputChange}
            >
              <option value="staff">Staff Member</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            Sign In
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
                Sign up here
              </Link>
            </p>
            <Link to="/" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
