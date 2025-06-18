import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { getEventById, deleteEvent, joinEvent } from "../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../provider/AuthProvider";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
        // setIsJoined(data.isJoined || false);
        const userEmail = user.email;
    const isJoined = data.participants.some(
      (participant) => participant.userEmail=== userEmail
    );
    setIsJoined(isJoined || false);
      } catch (err) {
        setError("Failed to load event details.");
        toast.error("Failed to load event details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully!");
      navigate("/events");
    } catch (err) {
      toast.error("Failed to delete event.");
      console.error(err);
    }
  };

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
    } catch (err) {
      toast.error("Failed to join event");
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };


  // const isAlreadyJoined= async (participants) => {
  //   console.log(participants);
  //   const userEmail = user.email;
  //   const isJoined = participants.some(
  //     (participant) => participant.userEmail=== userEmail
  //   );
  //   return isJoined;
  // };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">{error || "Event not found"}</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 text-primary-500 hover:text-primary-600"
          >
            <FaArrowLeft className="inline mr-2" />
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const isEventCreator = user && event.creatorId === user._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/events")}
        className="mb-6 text-primary-500 hover:text-primary-600 flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back to Events
      </button>

      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.thumbnailImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full">
            {event.eventType}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
              {event.title}
            </h1>
            {isEventCreator && (
              <div className="flex space-x-2">
                {/* <button
                  onClick={() => navigate(`/events/edit/${event._id}`)}
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit Event
                </button> */}
                {/* <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Delete Event
                </button> */}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                Event Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaCalendarAlt className="mr-3 text-xl" />
                  <div>
                    <p className="font-medium">
                      {new Date(event.eventDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      {new Date(event.eventDate).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaMapMarkerAlt className="mr-3 text-xl" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaUsers className="mr-3 text-xl" />
                  <span>{event?.participantsCount ?? 0} participants</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                Description
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {!isEventCreator && (
            <div className="mt-8">
              <button
                onClick={handleJoinEvent}
                disabled={isJoining}
                className={`w-full bg-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isJoining
                  ? "Processing..."
                  : isJoined
                  ? "Leave Event"
                  : "Join Event"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
