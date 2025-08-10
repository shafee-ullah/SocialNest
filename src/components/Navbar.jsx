// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
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
  FaBars,
  FaTimes,
  FaQuestionCircle,
} from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setImageError(false);
  }, [user?.photoURL]);

  const handleImageError = (e) => {
    console.error("Error loading profile image:", e);
    console.log("Image source that failed to load:", e.target.src);
    setImageError(true);
  };

  const renderProfileImage = () => {
    // If no user or no photo URL, return default avatar
    if (!user) {
      return (
        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
          <FaUser className="w-5 h-5 text-teal-600 dark:text-teal-300" />
        </div>
      );
    }

    // Process Google profile picture URL
    const getProcessedPhotoUrl = (url) => {
      if (!url) return null;

      // If it's a Google profile picture, modify the URL to get a larger size
      if (url.includes("googleusercontent.com")) {
        try {
          // Remove any existing size parameter
          const cleanUrl = url.split("=")[0];
          // Return URL with a larger size (s400-c)
          return `${cleanUrl}=s400-c`;
        } catch (error) {
          console.error("Error processing Google profile URL:", error);
          return url;
        }
      }
      return url;
    };

    const photoUrl = getProcessedPhotoUrl(user.photoURL);

    if (photoUrl && !imageError) {
      return (
        <div className="relative">
          <img
            src={photoUrl}
            alt={user.displayName || "Profile"}
            className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
            onError={handleImageError}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    // Fallback to default avatar if no photo URL or error loading image
    return (
      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
        {user.displayName ? (
          <span className="font-semibold text-teal-700 dark:text-teal-200">
            {user.displayName.charAt(0).toUpperCase()}
          </span>
        ) : (
          <FaUser className="w-5 h-5 text-teal-600 dark:text-teal-300" />
        )}
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
      >
        <FaHome className="mr-2" />
        Home
      </Link>
      <Link
        to="/events"
        className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
      >
        <FaCalendarAlt className="mr-2" />
        Upcoming Events
      </Link>

      {user && (
        <>
          <Link
            to="/create-event"
            className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
          >
            <FaPlus className="mr-2" />
            Create Event
          </Link>
          <Link
            to="/joined-events"
            className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
          >
            <FaCheckCircle className="mr-2" />
            Joined Events
          </Link>
          <Link
            to="/manage-events"
            className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
          >
            <FaList className="mr-2" />
            Manage Events
          </Link>
        </>
      )}

      <Link
        to="/about"
        className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
      >
        <FaBuilding className="mr-2" />
        About Us
      </Link>
      {!user && (
        <Link
          to="/help"
          className="flex items-center px-3 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition-colors"
        >
          <FaQuestionCircle className="mr-2" />
          Help Center
        </Link>
      )}
      <div className="px-3 py-2">
        <ThemeToggle />
      </div>
    </>
  );

  return (
    <nav className="bg-white dark:bg-teal-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Name */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-400 bg-clip-text text-transparent"
          >
            SocialNest
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks}
          </div>

          {/* Auth/User Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
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
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                  className="flex items-center focus:outline-none"
                >
                  {renderProfileImage()}
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white dark:bg-teal-900 rounded-lg shadow-lg border border-gray-200 dark:border-teal-800 py-2 z-50 transition-all duration-200 ${
                    isDropdownOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-teal-800 text-gray-900 dark:text-white font-semibold">
                    {user.displayName || "User"}
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-green-300 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-teal-900 shadow-lg border-t border-gray-200 dark:border-teal-800">
          <div className="flex flex-col space-y-1 px-4 py-4">
            {navLinks}
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="w-full text-center bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition shadow mb-2"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="w-full text-center bg-white border border-teal-600 text-teal-700 px-5 py-2 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-800 transition shadow"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-center flex items-center justify-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-teal-800 transition-colors mt-2"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
