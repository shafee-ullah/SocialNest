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
import { getEvent, joinEvent } from "../services/api";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        setError("Event ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await getEvent(id);
        setEvent(data);
        setIsJoined(data.isJoined || false);
      } catch (error) {
        setError("Failed to load event details");
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please login to join events");
      navigate("/auth/login");
      return;
    }

    try {
      setIsJoining(true);
      await joinEvent(id);
      setIsJoined(!isJoined);
      toast.success(
        isJoined ? "Left event successfully" : "Joined event successfully"
      );
    } catch (error) {
      console.error("Join event error:", error);
      toast.error("Failed to join event");
    } finally {
      setIsJoining(false);
    }
  };

  const handleLikeEvent = () => {
    if (!user) {
      toast.error("Please login to like events");
      navigate("/auth/login");
      return;
    }
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
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </button>

        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.thumbnailImage}
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
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2" />
                  {new Date(event.eventDate).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
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
                  src={event.organizer?.photoURL}
                  alt={event.organizer?.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                    {event.organizer?.displayName}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Event Organizer
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

            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                    <FaUsers className="w-5 h-5 mr-2" />
                    <span>{event.participantsCount || 0} participants</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                    {event.eventType}
                  </span>
                </div>
                <button
                  onClick={handleJoinEvent}
                  disabled={isJoining}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isJoined
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-primary-500 hover:bg-primary-600 text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isJoining
                    ? "Processing..."
                    : isJoined
                    ? "Leave Event"
                    : "Join Event"}
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
