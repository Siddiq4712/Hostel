// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import { responseHandler } from '../utils/responseHandler.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return responseHandler.error(res, 'Access token required', 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return responseHandler.error(res, 'Invalid or expired token', 403);
    }
    
    req.user = user; // { user_id, username, type_id, type_name }
    next();
  });
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES_IN || '24h' 
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};