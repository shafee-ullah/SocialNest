import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import { getJoinedEvents } from "../services/api";
import { toast } from "react-hot-toast";

const JoinedEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const data = await getJoinedEvents();
        // Sort events by date
        const sortedEvents = data.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        setEvents(sortedEvents);
      } catch (err) {
        setError("Failed to load joined events");
        console.error(err);
        toast.error("Failed to load joined events");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-secondary-200 dark:bg-secondary-700"></div>
              <div className="p-6">
                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Joined Events</h1>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search joined events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <FaSearch className="absolute left-3 top-3 text-secondary-400" />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={event.thumbnailImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                  {event.eventType}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary-900 dark:text-secondary-100">
                {event.title}
              </h3>
              <div className="space-y-2 mb-4">
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
                  <span>{event.participantsCount || 0} participants</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors"
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            {searchTerm
              ? "No joined events found matching your search."
              : "You haven't joined any events yet."}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate("/events")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Events
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
