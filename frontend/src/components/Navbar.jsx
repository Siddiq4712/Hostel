// components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBasedDashboard = () => {
    if (!user) return '/login';
    
    switch(user.type_id) {
      case 1: return '/admin/dashboard';    // Admin
      case 2: return '/store/dashboard';    // Store
      case 3: return '/retailer/dashboard'; // Retailer
      default: return '/';
    }
  };

  const getRoleName = () => {
    if (!user) return '';
    
    switch(user.type_id) {
      case 1: return 'Admin';
      case 2: return 'Store';
      case 3: return 'Retailer';
      default: return '';
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to={user ? getRoleBasedDashboard() : '/'} className="flex items-center">
              <h1 className="text-xl font-bold">HIMS</h1>
              <span className="ml-2 text-sm text-blue-200">Hostel Inventory Management</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm bg-blue-700 px-2 py-1 rounded">
                    {getRoleName()}
                  </span>
                  <span className="text-sm">Welcome, {user.username}</span>
                </div>

                {/* Dashboard Link */}
                <Link 
                  to={getRoleBasedDashboard()}
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest Links */}
                <Link 
                  to="/login" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;