// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">HIMS</h3>
            <p className="text-gray-300 text-sm">
              Hostel Inventory Management System - Streamlining mess procurement 
              processes with transparency and efficiency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About HIMS
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-2">Contact</h4>
            <div className="text-gray-300 text-sm space-y-1">
              <p>📧 support@hims.edu</p>
              <p>📞 +91-XXXX-XXXX-XX</p>
              <p>🏢 College Administration Office</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} HIMS - Hostel Inventory Management System. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;