// middlewares/roleMiddleware.js
import { responseHandler } from '../utils/responseHandler.js';

// Role constants based on database Type table
export const ROLES = {
  ADMIN: 1,      // Principal
  STORE: 2,      // Hostel Mess
  RETAILER: 3    // Supplier/Shop Owner
};

export const ROLE_NAMES = {
  1: 'Admin',
  2: 'Store', 
  3: 'Retailer'
};

// Check if user has required role
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseHandler.error(res, 'Authentication required', 401);
    }

    const userRole = req.user.type_id;
    
    if (!allowedRoles.includes(userRole)) {
      return responseHandler.error(res, 'Insufficient permissions', 403);
    }

    next();
  };
};

// Specific role middlewares
export const requireAdmin = requireRole(ROLES.ADMIN);
export const requireStore = requireRole(ROLES.STORE);
export const requireRetailer = requireRole(ROLES.RETAILER);

// Multiple role access
export const requireAdminOrStore = requireRole(ROLES.ADMIN, ROLES.STORE);
export const requireStoreOrRetailer = requireRole(ROLES.STORE, ROLES.RETAILER);

// Check if user is accessing their own data
export const requireSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    return responseHandler.error(res, 'Authentication required', 401);
  }

  const requestedUserId = parseInt(req.params.user_id || req.params.id);
  const currentUserId = req.user.user_id;
  const isAdmin = req.user.type_id === ROLES.ADMIN;

  if (!isAdmin && currentUserId !== requestedUserId) {
    return responseHandler.error(res, 'Access denied', 403);
  }

  next();
};

// Retailer profile completion check
export const requireCompleteProfile = (req, res, next) => {
  if (!req.user) {
    return responseHandler.error(res, 'Authentication required', 401);
  }

  // This will be enhanced when we implement retailer profile checking
  // For now, just pass through
  next();
};