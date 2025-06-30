import { useState } from 'react';
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionType, setActionType] = useState('login');

  const handleAuth = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful authentication
      const mockUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email,
        created_at: new Date().toISOString(),
        name: email.split('@')[0]
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    // Simulate logout delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setActionType('login');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center min-h-screen p-4">
        {user ? (
          <UserDashboard user={user} onLogout={handleLogout} loading={loading} />
        ) : (
          <AuthForm
            onAuth={handleAuth}
            loading={loading}
            error={error}
            actionType={actionType}
            setActionType={setActionType}
          />
        )}
      </div>
    </div>
  );
}

export default App;