import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaUsers } from "react-icons/fa";
import { getManageEvents, deleteEvent } from "../services/api.js";
import { toast } from "react-hot-toast";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getManageEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully");
      } catch (error) {
        setError("Failed to delete event");
        console.error("Delete event error:", error);
        toast.error("Failed to delete event");
      }
    }
  };

  const getEventStatus = (date) => {
    return new Date(date) > new Date() ? "upcoming" : "past";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-secondary-600 dark:text-secondary-400">
              Loading events...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
            Manage Events
          </h1>
          <Link
            to="/create-event"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create New Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
              No events found
            </h3>
            <p className="mt-2 text-secondary-600 dark:text-secondary-400">
              Get started by creating your first event.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                        {new Date(event.eventDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        at{" "}
                        {new Date(event.eventDate).toLocaleTimeString(
                          undefined,
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}{" "}
                        • {event.location}
                      </p>
                    </div>
                    <span
                      className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        getEventStatus(event.eventDate) === "upcoming"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}
                    >
                      {getEventStatus(event.eventDate)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                        <FaUsers className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event?.participantsCount || 0} participants
                        </span>
                      </div>
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">
                        {event.eventType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/events/${event._id}`}
                        className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400"
                      >
                        <FaEye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/events/${event._id}/edit`}
                        className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400"
                      >
                        <FaEdit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
