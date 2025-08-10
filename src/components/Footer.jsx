import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaCopyright
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-400 bg-clip-text text-transparent">
                SocialNest
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              SocialNest is your community-driven platform for creating,
              joining, and tracking social service events. Empower your
              neighborhood, connect with volunteers, and make a positive impact
              together.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="lg:ml-20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-teal-600 dark:text-teal-400 mt-1" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Community Street, City, Country
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-teal-600 dark:text-teal-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  +1 234 567 890
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-teal-600 dark:text-teal-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  support@socialnest.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
            <FaCopyright className="h-3.5 w-3.5" />
            <span>{new Date().getFullYear()} SocialNest. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
