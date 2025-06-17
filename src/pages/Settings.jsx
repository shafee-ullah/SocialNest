import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaSignOutAlt,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    newMessages: true,
    eventUpdates: true,
  });

  const [themeSettings, setThemeSettings] = useState({
    darkMode: false,
    primaryColor: "green",
  });

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleThemeChange = (e) => {
    const { name, value, checked } = e.target;
    setThemeSettings((prev) => ({
      ...prev,
      [name]: name === "darkMode" ? checked : value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement API call to update profile
      // await updateProfile(profileData);
      setSuccess("Profile updated successfully");
    } catch (error) {
      setError("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // TODO: Implement API call to update password
      // await updatePassword(passwordData);
      setSuccess("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError("Failed to update password");
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement API call to update notification settings
      // await updateNotificationSettings(notificationSettings);
      setSuccess("Notification settings updated successfully");
    } catch (error) {
      setError("Failed to update notification settings");
      console.error("Error updating notification settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement API call to update theme settings
      // await updateThemeSettings(themeSettings);
      setSuccess("Theme settings updated successfully");
    } catch (error) {
      setError("Failed to update theme settings");
      console.error("Error updating theme settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // TODO: Implement logout functionality
      // await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-primary-500 text-white"
                : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400"
            }`}
          >
            <FaUser className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === "password"
                ? "bg-primary-500 text-white"
                : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400"
            }`}
          >
            <FaLock className="mr-2" />
            Password
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === "notifications"
                ? "bg-primary-500 text-white"
                : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400"
            }`}
          >
            <FaBell className="mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("theme")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === "theme"
                ? "bg-primary-500 text-white"
                : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400"
            }`}
          >
            <FaPalette className="mr-2" />
            Theme
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
            {success}
          </div>
        )}

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium mb-2"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleProfileChange}
                accept="image/*"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Password Settings */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <form onSubmit={handleNotificationSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium"
                >
                  Email Notifications
                </label>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="eventReminders" className="text-sm font-medium">
                  Event Reminders
                </label>
                <input
                  type="checkbox"
                  id="eventReminders"
                  name="eventReminders"
                  checked={notificationSettings.eventReminders}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="newMessages" className="text-sm font-medium">
                  New Messages
                </label>
                <input
                  type="checkbox"
                  id="newMessages"
                  name="newMessages"
                  checked={notificationSettings.newMessages}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="eventUpdates" className="text-sm font-medium">
                  Event Updates
                </label>
                <input
                  type="checkbox"
                  id="eventUpdates"
                  name="eventUpdates"
                  checked={notificationSettings.eventUpdates}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </form>
        )}

        {/* Theme Settings */}
        {activeTab === "theme" && (
          <form onSubmit={handleThemeSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="darkMode" className="text-sm font-medium">
                  Dark Mode
                </label>
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={themeSettings.darkMode}
                  onChange={handleThemeChange}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="primaryColor"
                  className="block text-sm font-medium mb-2"
                >
                  Primary Color
                </label>
                <select
                  id="primaryColor"
                  name="primaryColor"
                  value={themeSettings.primaryColor}
                  onChange={handleThemeChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </form>
        )}

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
