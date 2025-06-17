// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaBuilding,
  FaSearch,
  FaPlus,
  FaHeart,
  FaCalendarAlt,
  FaList,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-teal-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Name */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-400 bg-clip-text text-transparent">
              SocialNest
            </span>
          </Link>

          {/* Main Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/events"
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-green-300 font-medium flex items-center transition-colors"
            >
              <FaCalendarAlt className="mr-2" />
              Upcoming Events
            </Link>
            <Link
              to="/create-event"
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-green-300 font-medium flex items-center transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Event
            </Link>
            <Link
              to="/joined-events"
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-green-300 font-medium flex items-center transition-colors"
            >
              <FaCheckCircle className="mr-2" />
              Joined Events
            </Link>
            <Link
              to="/manage-events"
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-green-300 font-medium flex items-center transition-colors"
            >
              <FaList className="mr-2" />
              Manage Events
            </Link>
            <ThemeToggle />
          </div>

          {/* Auth/User Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition shadow"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-white border border-teal-600 text-teal-700 px-5 py-2 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-800 transition shadow"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 150)}
                  className="flex items-center focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
                      <FaUser className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                    </div>
                  )}
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white dark:bg-teal-900 rounded-lg shadow-lg border border-gray-200 dark:border-teal-800 py-2 z-50 transition-all duration-200 ${
                    isUserMenuOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-teal-800 text-gray-900 dark:text-white font-semibold flex items-center space-x-2">
                    {user.displayName ? (
                      <>
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-7 h-7 rounded-full border border-teal-400"
                          />
                        ) : (
                          <FaUser className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                        )}
                        <span>{user.displayName}</span>
                      </>
                    ) : (
                      <span>User</span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-teal-800 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-green-300 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-teal-900 shadow-lg border-t border-gray-200 dark:border-teal-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
            >
              Properties
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
            >
              Search
            </Link>
            {user && (
              <Link
                to="/add-property"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
              >
                Add Listing
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  Profile
                </Link>
                <Link
                  to="/my-listings"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  My Listings
                </Link>
                <Link
                  to="/favorites"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
