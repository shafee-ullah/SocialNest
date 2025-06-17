import React from "react";
import {
  FaCalendarPlus,
  FaUsers,
  FaMapMarkerAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCalendarPlus className="w-8 h-8 text-teal-600" />,
    title: "Create Events",
    desc: "Easily organize and promote social service events in your local area.",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-teal-600" />,
    title: "Join & Connect",
    desc: "Find and join events that matter to you. Connect with like-minded people.",
  },
  {
    icon: <FaMapMarkerAlt className="w-8 h-8 text-teal-600" />,
    title: "Local Impact",
    desc: "Make a difference in your community by participating in local initiatives.",
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-teal-600" />,
    title: "Track Progress",
    desc: "Monitor your contributions and see the positive change you help create.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
];

const Home = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-teal-600 to-green-400">
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to{" "}
            <span className="bg-white bg-opacity-20 px-2 rounded">
              SocialNest
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-6 font-medium drop-shadow">
            Build a better community. Create, join, and track social service
            events in your local area.
          </p>
          <a
            href="/events"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
          >
            Explore Events
          </a>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent" />
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            How SocialNest Empowers You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Community Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow group relative"
              >
                <img
                  src={img}
                  alt={`Event ${idx + 1}`}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">Event {idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Connected with SocialNest
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for the latest updates on social service
            events and community news.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled
            />
            <button
              type="button"
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
              disabled
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
