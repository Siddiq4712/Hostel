// src/router.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

// Import Protected Route components
import ProtectedRoute, { 
  AdminRoute, 
  StoreRoute, 
  RetailerRoute, 
  AdminOrStoreRoute 
} from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RetailerRegister from './pages/auth/RetailerRegister';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageCategories from './pages/admin/ManageCategories';
import ManageItems from './pages/admin/ManageItems';
import RetailerManagement from './pages/admin/RetailerManagement';
import RequirementApproval from './pages/admin/RequirementApproval';
import QuotationComparison from './pages/admin/QuotationComparison';

// Store Pages
import StoreDashboard from './pages/store/Dashboard';
import CreateRequirement from './pages/store/CreateRequirement';
import RequirementHistory from './pages/store/RequirementHistory';
import QuotationView from './pages/store/QuotationView';

// Retailer Pages
import RetailerDashboard from './pages/retailer/Dashboard';
import ProfileSetup from './pages/retailer/ProfileSetup';
import SubmitQuotation from './pages/retailer/SubmitQuotation';
import QuotationHistory from './pages/retailer/QuotationHistory';

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public Routes
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "retailer-register", 
        element: <RetailerRegister />
      },

      // Admin Routes
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />
          },
          {
            path: "dashboard",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            )
          },
          {
            path: "categories",
            element: (
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            )
          },
          {
            path: "items",
            element: (
              <AdminRoute>
                <ManageItems />
              </AdminRoute>
            )
          },
          {
            path: "retailers",
            element: (
              <AdminRoute>
                <RetailerManagement />
              </AdminRoute>
            )
          },
          {
            path: "requirements",
            element: (
              <AdminRoute>
                <RequirementApproval />
              </AdminRoute>
            )
          },
          {
            path: "quotations",
            element: (
              <AdminRoute>
                <QuotationComparison />
              </AdminRoute>
            )
          }
        ]
      },

      // Store Routes
      {
        path: "store",
        children: [
          {
            index: true,
            element: <Navigate to="/store/dashboard" replace />
          },
          {
            path: "dashboard",
            element: (
              <StoreRoute>
                <StoreDashboard />
              </StoreRoute>
            )
          },
          {
            path: "requirements/create",
            element: (
              <StoreRoute>
                <CreateRequirement />
              </StoreRoute>
            )
          },
          {
            path: "requirements/history",
            element: (
              <StoreRoute>
                <RequirementHistory />
              </StoreRoute>
            )
          },
          {
            path: "quotations",
            element: (
              <StoreRoute>
                <QuotationView />
              </StoreRoute>
            )
          }
        ]
      },

      // Retailer Routes
      {
        path: "retailer",
        children: [
          {
            index: true,
            element: <Navigate to="/retailer/dashboard" replace />
          },
          {
            path: "dashboard",
            element: (
              <RetailerRoute>
                <RetailerDashboard />
              </RetailerRoute>
            )
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute allowedRoles={[3]}>
                <ProfileSetup />
              </ProtectedRoute>
            )
          },
          {
            path: "quotations/submit",
            element: (
              <RetailerRoute>
                <SubmitQuotation />
              </RetailerRoute>
            )
          },
          {
            path: "quotations/history",
            element: (
              <RetailerRoute>
                <QuotationHistory />
              </RetailerRoute>
            )
          }
        ]
      },

      // Catch-all route for 404 pages
      {
        path: "*",
        element: (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-gray-500 text-6xl mb-4">404</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
              <p className="text-gray-600 mb-4">
                The page you're looking for doesn't exist.
              </p>
              <a
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
              >
                Go Home
              </a>
            </div>
          </div>
        )
      }
    ]
  }
]);

export default router;