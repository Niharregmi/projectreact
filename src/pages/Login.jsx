import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
    
    const NavBar = () => (
      <nav className="flex justify-end space-x-4 mb-6">
        <button
          className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          onClick={() => navigate('/')}
        >
          Landing
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          onClick={() => navigate('/login')}
        >
          SIgn up
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          onClick={() => navigate('/signup')}
        >
          Login
        </button>
      </nav>
    );

    

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/staff-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (data) => {
    data.preventDefault();
    try {
       login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center">
          <UserCircle size={64} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Sign in to your account</h2>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
