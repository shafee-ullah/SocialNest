import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEye } from "react-icons/fa";
import { getJoinedEvents } from "../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../provider/AuthProvider";

const JoinedEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (!user) {
        setError("Please login to view joined events");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await getJoinedEvents();
        // Sort events by date
        const sortedEvents = Array.isArray(data)
          ? data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
          : [];
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching joined events:", err);
        setError(err.message || "Failed to load joined events");
        toast.error(err.message || "Failed to load joined events");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user]);

  const handleViewEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Please login to view joined events
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="text-primary-500 hover:text-primary-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">
            Loading joined events...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary-500 hover:text-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-secondary-900 dark:text-white">
        My Joined Events
      </h1>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            You haven't joined any events yet.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 text-primary-500 hover:text-primary-600"
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={event.thumbnailImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                  {event.eventType}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                    <FaCalendarAlt className="mr-2" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                    <FaUsers className="mr-2" />
                    <span>{event?.participantsCount ?? 0} participants</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewEvent(event._id)}
                  className="mt-4 w-full flex items-center justify-center bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 py-2 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
                >
                  <FaEye className="mr-2" />
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
