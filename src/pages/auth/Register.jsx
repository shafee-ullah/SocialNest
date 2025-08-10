import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../provider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      await createUser(formData.email, formData.password);
      
      // Update user profile with display name
      await updateUserProfile(formData.name.trim(), null);
      
      // Navigate to home page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please log in instead.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to create an account. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600 dark:text-secondary-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 pl-10 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full name"
                />
                <FaUser className="absolute left-3 top-3 text-secondary-400" />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 pl-10 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute left-3 top-3 text-secondary-400" />
              </div>
            </div>

            {/* Password field with show/hide toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 pl-10 pr-10 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Create a password"
                />
                <FaLock className="absolute left-3 top-3 text-secondary-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-secondary-400 hover:text-secondary-500 focus:outline-none"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field with show/hide toggle */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 pl-10 pr-10 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm your password"
                />
                <FaLock className="absolute left-3 top-3 text-secondary-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-secondary-400 hover:text-secondary-500 focus:outline-none"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-300 dark:border-secondary-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary-50 dark:bg-secondary-900 text-secondary-500 dark:text-secondary-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm bg-white dark:bg-secondary-700 text-sm font-medium text-secondary-700 dark:text-white hover:bg-secondary-50 dark:hover:bg-secondary-600 disabled:opacity-50"
            >
              <FaGoogle className="mr-2" />
              {loading ? 'Signing up...' : 'Continue with Google'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              Sign in
            </Link>
          </p>
          
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-sm bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition shadow"
            >
              <FaArrowLeft className="mr-1" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
