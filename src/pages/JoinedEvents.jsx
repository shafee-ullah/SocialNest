import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const JoinedEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Simulate fetching joined events from localStorage
    const allEvents = JSON.parse(
      localStorage.getItem("socialnest_events") || "[]"
    );
    // For demo: assume joinedUsers is an array of emails
    const joined = allEvents.filter(
      (event) => event.joinedUsers && event.joinedUsers.includes(user.email)
    );
    // Sort by event date
    joined.sort((a, b) => new Date(a.date) - new Date(b.date));
    setJoinedEvents(joined);
    setLoading(false);
  }, [user]);

  if (!user) {
    return null; // Should be protected by PrivateRoute
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-teal-700 dark:text-teal-300 text-center">
        Joined Events
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : joinedEvents.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven't joined any events yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {event.title}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {event.eventType} | {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-2">
                {event.location}
              </div>
              <p className="text-gray-600 dark:text-gray-400 flex-1">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
