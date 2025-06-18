import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
} from "react-icons/fa";
import { getUpcomingEvents, joinEvent } from "../services/api.js";
import { toast } from "react-hot-toast";
import { useAuth } from "../provider/AuthProvider";

const Events = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningEventId, setJoiningEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    { id: "all", name: "All Events" },
    { id: "environment", name: "Environment" },
    { id: "charity", name: "Charity" },
    { id: "education", name: "Education" },
    { id: "health", name: "Health" },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleJoinEvent = async (eventId) => {
    if (!user) {
      toast.error("Please login to join events");
      navigate("/auth/login");
      return;
    }

    try {
      setJoiningEventId(eventId);
      const response = await joinEvent(eventId);

      // Update the events list to reflect the join
      setEvents(
        events.map((event) => {
          if (event._id === eventId) {
            return {
              ...event,
              isJoined: true,
              participantsCount: (event.participantsCount || 0) + 1,
            };
          }
          return event;
        })
      );

      toast.success("Successfully joined the event!");
    } catch (err) {
      toast.error(err.message || "Failed to join event");
      console.error(err);
    } finally {
      setJoiningEventId(null);
    }
  };

  const isAlreadyJoined = (participants) => {
    const userEmail = user?.email;
    const isJoined = participants.some(
      (participant) => participant.userEmail === userEmail
    );
    return isJoined;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaSearch className="absolute left-3 top-3 text-secondary-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
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
                {/*{event.category.charAt(0).toUpperCase() +*/}
                {/*  event.category.slice(1)}*/}
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
                    })}{" "}
                    at{" "}
                    {new Date(event.eventDate).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
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
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleViewEvent(event._id)}
                  className="flex-1 flex items-center justify-center bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 py-2 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
                >
                  <FaEye className="mr-2" />
                  View Event
                </button>
                <button
                  onClick={() => handleJoinEvent(event._id)}
                  disabled={
                    isAlreadyJoined(event.participants) || event?.isJoined
                  }
                  className={`
                    flex-1 py-2 rounded-md transition-colors
                    ${
                      isAlreadyJoined(event.participants) || event?.isJoined
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-primary-500 text-white hover:bg-primary-600"
                    }
                    `}
                >
                  {isAlreadyJoined(event.participants) || event?.isJoined
                    ? "Already Joined"
                    : "Join Event"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            No events found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;
