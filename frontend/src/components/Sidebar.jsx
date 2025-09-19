// components/Sidebar.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white';
  };

  // Admin Menu Items
  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/categories', label: 'Manage Categories', icon: '📁' },
    { path: '/admin/items', label: 'Manage Items', icon: '📦' },
    { path: '/admin/retailers', label: 'Retailer Management', icon: '🏪' },
    { path: '/admin/requirements', label: 'Requirement Approval', icon: '✅' },
    { path: '/admin/quotations', label: 'Quotation Comparison', icon: '📊' }
  ];

  // Store Menu Items
  const storeMenuItems = [
    { path: '/store/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/store/requirements/create', label: 'Create Requirement', icon: '➕' },
    { path: '/store/requirements/history', label: 'Requirement History', icon: '📋' },
    { path: '/store/quotations', label: 'View Quotations', icon: '👁️' }
  ];

  // Retailer Menu Items
  const retailerMenuItems = [
    { path: '/retailer/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/retailer/profile', label: 'Profile Setup', icon: '👤' },
    { path: '/retailer/quotations/submit', label: 'Submit Quotation', icon: '💰' },
    { path: '/retailer/quotations/history', label: 'Quotation History', icon: '📜' }
  ];

  const getMenuItems = () => {
    switch(user.type_id) {
      case 1: return adminMenuItems;    // Admin
      case 2: return storeMenuItems;    // Store
      case 3: return retailerMenuItems; // Retailer
      default: return [];
    }
  };

  return (
    <div className="bg-blue-600 text-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <p className="text-blue-200 text-sm">
            {user.type_id === 1 ? 'Admin Panel' : 
             user.type_id === 2 ? 'Store Panel' : 
             'Retailer Panel'}
          </p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {getMenuItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded transition-colors duration-200 ${isActiveLink(item.path)}`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-4 border-t border-blue-500">
          <div className="text-xs text-blue-200">
            <p>Logged in as:</p>
            <p className="font-medium">{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;