// utils/responseHandler.js

export const responseHandler = {
  // Success responses
  success: (res, message = 'Success', data = null, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  },

  // Created response (for POST requests)
  created: (res, message = 'Created successfully', data = null) => {
    return responseHandler.success(res, message, data, 201);
  },

  // Error responses
  error: (res, message = 'An error occurred', statusCode = 400, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  },

  // Validation error
  validationError: (res, errors, message = 'Validation failed') => {
    return responseHandler.error(res, message, 422, errors);
  },

  // Not found error
  notFound: (res, message = 'Resource not found') => {
    return responseHandler.error(res, message, 404);
  },

  // Unauthorized error
  unauthorized: (res, message = 'Unauthorized access') => {
    return responseHandler.error(res, message, 401);
  },

  // Forbidden error
  forbidden: (res, message = 'Access forbidden') => {
    return responseHandler.error(res, message, 403);
  },

  // Internal server error
  serverError: (res, message = 'Internal server error') => {
    return responseHandler.error(res, message, 500);
  },

  // Conflict error (duplicate data)
  conflict: (res, message = 'Resource already exists') => {
    return responseHandler.error(res, message, 409);
  },

  // Paginated response
  paginated: (res, data, pagination, message = 'Data retrieved successfully') => {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit)
      },
      timestamp: new Date().toISOString()
    });
  }
};