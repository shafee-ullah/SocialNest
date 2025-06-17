import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaShare,
  FaArrowLeft,
} from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock data for now
    const mockEvent = {
      id: parseInt(id),
      title: "Community Clean-up Day",
      description:
        "Join us for a day of community service as we clean up our local park. We'll be collecting trash, planting trees, and making our community a better place for everyone.",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Central Park",
      category: "Environment",
      participants: 15,
      maxParticipants: 30,
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      organizer: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Community Leader",
      },
      schedule: [
        { time: "09:00 AM", activity: "Registration and Welcome" },
        { time: "09:30 AM", activity: "Safety Briefing" },
        { time: "10:00 AM", activity: "Clean-up Activities Begin" },
        { time: "12:00 PM", activity: "Lunch Break" },
        { time: "01:00 PM", activity: "Afternoon Activities" },
        { time: "03:00 PM", activity: "Closing Ceremony" },
      ],
      requirements: [
        "Comfortable clothing and closed-toe shoes",
        "Water bottle",
        "Sunscreen and hat",
        "Work gloves (optional)",
        "Positive attitude!",
      ],
    };

    setEvent(mockEvent);
    setLoading(false);
  }, [id]);

  const handleJoinEvent = async () => {
    try {
      // TODO: Implement actual join functionality
      setIsJoined(!isJoined);
    } catch (error) {
      setError("Failed to join event");
      console.error("Join event error:", error);
    }
  };

  const handleLikeEvent = () => {
    setIsLiked(!isLiked);
  };

  const handleShareEvent = async () => {
    try {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-secondary-200 dark:bg-secondary-700 rounded-lg"></div>
            <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4"></div>
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
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

  if (!event) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              Event not found
            </h2>
            <button
              onClick={() => navigate("/events")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaArrowLeft className="mr-2" />
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </button>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="flex items-center">
                  <FaCalendar className="mr-2" />
                  {event.date}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2" />
                  {event.time}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                    {event.organizer.name}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {event.organizer.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLikeEvent}
                  className={`p-2 rounded-full ${
                    isLiked
                      ? "text-red-500 hover:text-red-600"
                      : "text-secondary-600 dark:text-secondary-400 hover:text-red-500 dark:hover:text-red-400"
                  }`}
                >
                  <FaHeart className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShareEvent}
                  className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 rounded-full"
                >
                  <FaShare className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-secondary-600 dark:text-secondary-400">
                {event.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
                  Schedule
                </h3>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-24 text-sm font-medium text-secondary-900 dark:text-secondary-100">
                        {item.time}
                      </div>
                      <div className="flex-1 text-secondary-600 dark:text-secondary-400">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {event.requirements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-secondary-600 dark:text-secondary-400"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                    <FaUsers className="w-5 h-5 mr-2" />
                    <span>
                      {event.participants}/{event.maxParticipants} participants
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                    {event.category}
                  </span>
                </div>
                <button
                  onClick={handleJoinEvent}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isJoined
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-primary-500 hover:bg-primary-600 text-white"
                  }`}
                >
                  {isJoined ? "Leave Event" : "Join Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
