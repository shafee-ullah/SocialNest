import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaImage,
} from "react-icons/fa";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Workshop",
  "Other",
];

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    date: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Local state for events (simulate DB)
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("socialnest_events");
    return stored ? JSON.parse(stored) : [];
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
    setError("");
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date && date > today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (
      !form.title ||
      !form.description ||
      !form.eventType ||
      !form.thumbnail ||
      !form.location ||
      !form.date
    ) {
      setError("All fields are required.");
      return;
    }
    if (!isFutureDate(form.date)) {
      setError("Event date must be a future date.");
      return;
    }
    setSubmitting(true);
    // Simulate event creation
    const newEvent = {
      ...form,
      date: form.date.toISOString(),
      creatorEmail: user?.email || "",
      id: Date.now(),
      joinedUsers: [],
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("socialnest_events", JSON.stringify(updatedEvents));
    setSuccess("Event created successfully! Redirecting to Upcoming Events...");
    setTimeout(() => {
      navigate("/events");
    }, 1500);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">
          Login Required
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You must be logged in to create an event.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                error
                  ? "border-red-500"
                  : "border-secondary-300 dark:border-secondary-600"
              } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              placeholder="Enter event title"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border ${
                error
                  ? "border-red-500"
                  : "border-secondary-300 dark:border-secondary-600"
              } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              placeholder="Describe your event"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="eventType"
              className="block text-sm font-medium mb-2"
            >
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                error
                  ? "border-red-500"
                  : "border-secondary-300 dark:border-secondary-600"
              } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
            >
              <option value="">Select type</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium mb-2"
            >
              Thumbnail Image URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                error
                  ? "border-red-500"
                  : "border-secondary-300 dark:border-secondary-600"
              } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              placeholder="Enter thumbnail image URL"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-2"
            >
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  error
                    ? "border-red-500"
                    : "border-secondary-300 dark:border-secondary-600"
                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="Enter event location"
              />
              <FaMapMarkerAlt className="absolute left-3 top-3 text-secondary-400" />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Event Date
            </label>
            <DatePicker
              selected={form.date}
              onChange={handleDateChange}
              minDate={new Date()}
              showTimeSelect={false}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a future date"
              className={`w-full px-4 py-2 rounded-lg border ${
                error
                  ? "border-red-500"
                  : "border-secondary-300 dark:border-secondary-600"
              } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating Event..." : "Create Event"}
            </button>
            {success && (
              <p className="mt-2 text-sm text-green-500 text-center">
                {success}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
