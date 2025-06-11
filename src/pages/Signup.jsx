import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // cons {Signup, handleSubmit} = useForm();
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    const {Signup, handleSubmit} = useForm();
    alert('User registered successfully');
    navigate('/login');}

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
        Login
      </button>
      <button
        className="px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        onClick={() => navigate('/signup')}
      >
        Signup
      </button>
    </nav>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate('/login');
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <NavBar />
        <div className="flex flex-col items-center">
          <UserCircle size={64} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Create your account</h2>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;