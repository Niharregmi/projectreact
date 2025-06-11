import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import StaffList from './pages/StaffList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/landing';
import Attendance from './pages/Attendance';
import Notices from './pages/Notices';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && <Header />}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/staff"
            element={
              isAuthenticated && user?.role === 'admin' ? (
                <StaffList />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/attendance"
            element={
              isAuthenticated ? <Attendance /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/notices"
            element={
              isAuthenticated ? <Notices /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
