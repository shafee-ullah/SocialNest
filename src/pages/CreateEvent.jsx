import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaImage,
} from "react-icons/fa";
import { createEvent, getEvent, updateEvent } from "../services/api.js";
import { toast } from "react-hot-toast";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Workshop",
  "Other",
];

const CreateEvent = () => {
  const { id } = useParams();
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
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const event = await getEvent(id);
        if (!event) {
          toast.error("Event not found");
          navigate("/events");
          return;
        }
        setForm({
          title: event.title || "",
          description: event.description || "",
          eventType: event.eventType || "",
          thumbnail: event.thumbnailImage || "",
          location: event.location || "",
          date: event.eventDate ? new Date(event.eventDate) : null,
        });
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

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
      setSubmitting(false);
      return;
    }
    if (!isFutureDate(form.date)) {
      setError("Event date must be a future date.");
      setSubmitting(false);
      return;
    }

    const eventData = {
      title: form.title,
      description: form.description,
      eventType: form.eventType,
      thumbnailImage: form.thumbnail,
      location: form.location,
      eventDate: form.date.toISOString(),
    };

    try {
      if (id) {
        const updatedEvent = await updateEvent(id, eventData);
        if (updatedEvent) {
          toast.success("Event updated successfully!");
          navigate("/events");
        } else {
          throw new Error("Failed to update event");
        }
      } else {
        const createdEvent = await createEvent(eventData);
        if (createdEvent) {
          toast.success("Event created successfully!");
          navigate("/events");
        } else {
          throw new Error("Failed to create event");
        }
      }
    } catch (error) {
      console.error("Event operation failed:", error);
      setError(
        error.message ||
          (id ? "Failed to update event" : "Failed to create event")
      );
      toast.error(
        error.message ||
          (id ? "Failed to update event" : "Failed to create event")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">
          Login Required
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You must be logged in to {id ? "edit" : "create"} an event.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4"></div>
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4"></div>
            <div className="h-32 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {id ? "Edit Event" : "Create New Event"}
        </h1>

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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-lg font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-lg font-medium text-white bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? id
                  ? "Updating Event..."
                  : "Creating Event..."
                : id
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
