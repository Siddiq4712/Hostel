// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [], requireCompleteProfile = false }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.type_id)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if retailer profile completion is required
  if (requireCompleteProfile && user.type_id === 3) {
    // This will be enhanced when we implement profile completion checking
    // For now, just pass through
  }

  return children;
};

// Higher-order component for specific roles
export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[1]}>{children}</ProtectedRoute>
);

export const StoreRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[2]}>{children}</ProtectedRoute>
);

export const RetailerRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[3]} requireCompleteProfile={true}>
    {children}
  </ProtectedRoute>
);

export const AdminOrStoreRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[1, 2]}>{children}</ProtectedRoute>
);

export const StoreOrRetailerRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[2, 3]}>{children}</ProtectedRoute>
);

export default ProtectedRoute;