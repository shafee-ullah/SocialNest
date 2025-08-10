import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="animate-bounce">
          <div className="mx-auto w-48 h-48 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <span className="text-9xl font-bold text-white">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Oops! Page Not Found
        </h1>
        
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group relative w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaHome className="h-5 w-5 text-teal-300 group-hover:text-white transition-colors" />
            </span> */}
            Go to Homepage
          </Link>
          
          {/* <Link
            to="/events"
            className="group relative w-full sm:w-auto flex justify-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            Browse Events
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              <FaArrowRight className="h-5 w-5 text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors" />
            </span>
          </Link> */}
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{' '}
            <a 
              href="mailto:support@socialnest.com" 
              className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
