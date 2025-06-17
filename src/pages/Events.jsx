import React, { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Community Clean-up Day",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Central Park",
      category: "environment",
      image: "https://source.unsplash.com/random/800x600?cleaning",
      participants: 45,
      description:
        "Join us for a day of cleaning up our local park and making it beautiful for everyone.",
    },
    {
      id: 2,
      title: "Food Drive for Homeless",
      date: "2024-03-20",
      time: "10:00 AM",
      location: "Community Center",
      category: "charity",
      image: "https://source.unsplash.com/random/800x600?food,donation",
      participants: 30,
      description:
        "Help us collect and distribute food to those in need in our community.",
    },
    {
      id: 3,
      title: "Youth Mentoring Program",
      date: "2024-03-25",
      time: "02:00 PM",
      location: "Youth Center",
      category: "education",
      image: "https://source.unsplash.com/random/800x600?mentoring",
      participants: 20,
      description:
        "Volunteer to mentor young people and help shape their future.",
    },
    // Add more mock events as needed
  ];

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
            key={event.id}
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                {event.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <FaUsers className="mr-2" />
                  <span>{event.participants} participants</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors">
                Join Event
              </button>
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
