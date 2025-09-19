// utils/validators.js

export const validators = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation (min 6 characters, at least 1 letter and 1 number)
  isValidPassword: (password) => {
    return password && password.length >= 6 && /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
  },

  // Username validation (alphanumeric, 3-20 characters)
  isValidUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  },

  // Phone number validation (Indian format)
  isValidPhone: (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  },

  // GST number validation
  isValidGST: (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  },

  // PAN number validation
  isValidPAN: (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  },

  // IFSC code validation
  isValidIFSC: (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  },

  // Bank account number validation (9-18 digits)
  isValidBankAccount: (account) => {
    const accountRegex = /^[0-9]{9,18}$/;
    return accountRegex.test(account);
  },

  // License number validation (basic alphanumeric)
  isValidLicense: (license) => {
    return license && license.length >= 5 && /^[A-Z0-9-/]+$/i.test(license);
  },

  // Postal code validation (Indian PIN code)
  isValidPincode: (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  }
};

// Validation middleware creator
export const validateBody = (schema) => {
  return (req, res, next) => {
    const errors = {};
    
    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];
      
      // Required field check
      if (rules.required && (!value || value.toString().trim() === '')) {
        errors[field] = `${field} is required`;
        continue;
      }
      
      // Skip validation if field is not required and empty
      if (!rules.required && (!value || value.toString().trim() === '')) {
        continue;
      }
      
      // Type validation
      if (rules.type) {
        if (rules.type === 'email' && !validators.isValidEmail(value)) {
          errors[field] = 'Invalid email format';
        } else if (rules.type === 'password' && !validators.isValidPassword(value)) {
          errors[field] = 'Password must be at least 6 characters with letters and numbers';
        } else if (rules.type === 'username' && !validators.isValidUsername(value)) {
          errors[field] = 'Username must be 3-20 alphanumeric characters';
        } else if (rules.type === 'phone' && !validators.isValidPhone(value)) {
          errors[field] = 'Invalid phone number format';
        } else if (rules.type === 'gst' && !validators.isValidGST(value)) {
          errors[field] = 'Invalid GST number format';
        } else if (rules.type === 'pan' && !validators.isValidPAN(value)) {
          errors[field] = 'Invalid PAN number format';
        } else if (rules.type === 'ifsc' && !validators.isValidIFSC(value)) {
          errors[field] = 'Invalid IFSC code format';
        } else if (rules.type === 'bankAccount' && !validators.isValidBankAccount(value)) {
          errors[field] = 'Invalid bank account number';
        } else if (rules.type === 'license' && !validators.isValidLicense(value)) {
          errors[field] = 'Invalid license number format';
        } else if (rules.type === 'pincode' && !validators.isValidPincode(value)) {
          errors[field] = 'Invalid PIN code format';
        }
      }
      
      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} must be at least ${rules.minLength} characters`;
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
      }
    }
    
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
};

// Common validation schemas
export const validationSchemas = {
  register: {
    username: { required: true, type: 'username' },
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
    type_id: { required: true }
  },
  
  login: {
    username: { required: true },
    password: { required: true }
  },
  
  retailerDetails: {
    retailer_name: { required: true, minLength: 2, maxLength: 100 },
    license_number: { required: true, type: 'license' },
    gst_number: { required: true, type: 'gst' },
    pan_number: { required: true, type: 'pan' },
    owner_name: { required: true, minLength: 2, maxLength: 100 },
    owner_govt_id_number: { required: true, minLength: 5, maxLength: 20 },
    phone_number_1: { required: true, type: 'phone' },
    email_address_1: { required: true, type: 'email' },
    door_number: { required: true },
    street_address: { required: true },
    city: { required: true },
    postal_id: { required: true },
    bank_account_number: { required: true, type: 'bankAccount' },
    ifsc_code: { required: true, type: 'ifsc' }
  }
};