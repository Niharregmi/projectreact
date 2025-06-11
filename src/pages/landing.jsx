import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
    <p className="text-lg mb-6">Please sign in or create an account to continue.</p>
    <div className="space-x-4">
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
      <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
    </div>
  </div>
);

export default Landing;
