import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaCalendarPlus,
  FaCheckCircle,
  FaList,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaHeart,
  FaComment,
  FaChartLine,
  FaStar,
  FaHandHoldingHeart,
  FaRocket,
} from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { getJoinedEvents, getManageEvents, getPosts } from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    joinedEvents: 0,
    managedEvents: 0,
    postsCreated: 0,
    totalLikes: 0,
    totalComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch joined events
        const joinedEvents = await getJoinedEvents();

        // Fetch managed events
        const managedEvents = await getManageEvents();

        // Fetch user's posts
        const allPosts = await getPosts();
        const userPosts = allPosts.filter((post) => post.userId === user?.email);

        // Calculate total likes and comments
        const totalLikes = userPosts.reduce(
          (sum, post) => sum + (post.likes?.length || 0),
          0
        );
        const totalComments = userPosts.reduce(
          (sum, post) => sum + (post.comments?.length || 0),
          0
        );

        setStats({
          joinedEvents: joinedEvents?.length || 0,
          managedEvents: managedEvents?.length || 0,
          postsCreated: userPosts.length,
          totalLikes,
          totalComments,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  const dashboardCards = [
    {
      title: "Create Event",
      description: "Organize a new social service event",
      icon: <FaCalendarPlus className="w-8 h-8" />,
      link: "/create-event",
      bgColor: "bg-gradient-to-br from-teal-500 to-green-400",
      hoverColor: "hover:from-teal-600 hover:to-green-500",
      badge: "New Event",
    },
    {
      title: "Joined Events",
      description: "View events you've registered for",
      icon: <FaCheckCircle className="w-8 h-8" />,
      link: "/joined-events",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
      hoverColor: "hover:from-blue-600 hover:to-cyan-500",
      count: stats.joinedEvents,
    },
    {
      title: "Manage Events",
      description: "Manage your organized events",
      icon: <FaList className="w-8 h-8" />,
      link: "/manage-events",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-400",
      hoverColor: "hover:from-purple-600 hover:to-pink-500",
      count: stats.managedEvents,
    },
    {
      title: "Community Feed",
      description: "Share stories and connect",
      icon: <FaUsers className="w-8 h-8" />,
      link: "/community",
      bgColor: "bg-gradient-to-br from-orange-500 to-yellow-400",
      hoverColor: "hover:from-orange-600 hover:to-yellow-500",
      badge: "Connect",
    },
  ];

  const statsCards = [
    {
      title: "Events Joined",
      value: stats.joinedEvents,
      icon: <FaCalendarAlt className="w-6 h-6" />,
      description: "Volunteer activities",
      color: "teal",
      gradient: "from-teal-500 to-teal-400",
    },
    {
      title: "Events Created",
      value: stats.managedEvents,
      icon: <FaRocket className="w-6 h-6" />,
      description: "Organized initiatives",
      color: "purple",
      gradient: "from-purple-500 to-purple-400",
    },
    {
      title: "Posts Created",
      value: stats.postsCreated,
      icon: <FaComment className="w-6 h-6" />,
      description: "Community shares",
      color: "blue",
      gradient: "from-blue-500 to-blue-400",
    },
    {
      title: "Total Engagement",
      value: stats.totalLikes + stats.totalComments,
      icon: <FaHeart className="w-6 h-6" />,
      description: "Likes & comments",
      color: "red",
      gradient: "from-red-500 to-red-400",
    },
  ];

  const renderProfileImage = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt={user.displayName || "User"}
          className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }

    return (
      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-xl">
        <FaUser className="w-10 h-10 text-teal-600" />
      </div>
    );
  };

  const getImpactLevel = () => {
    const totalImpact = stats.joinedEvents + stats.managedEvents * 2 + stats.postsCreated;
    if (totalImpact >= 20) return { level: "Community Hero", icon: "🏆", color: "text-yellow-500" };
    if (totalImpact >= 10) return { level: "Active Volunteer", icon: "⭐", color: "text-purple-500" };
    if (totalImpact >= 5) return { level: "Emerging Leader", icon: "🌱", color: "text-green-500" };
    return { level: "New Volunteer", icon: "👋", color: "text-white" };
  };

  const impactLevel = getImpactLevel();

  return (
    <>
      <Helmet>
        <title>Dashboard - SocialNest</title>
        <meta name="description" content="Your SocialNest dashboard" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-teal-600"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                  {renderProfileImage()}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-green-400 rounded-full flex items-center justify-center">
                      <FaStar className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Welcome Text */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Welcome back, {user?.displayName || "Friend"}! {impactLevel.icon}
                  </h1>
                  <p className="text-teal-100 text-lg mb-3">
                    Continue your journey of making a difference
                  </p>
                  
                  {/* Impact Level */}
                  <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    <span className={`text-sm font-semibold ${impactLevel.color}`}>
                      {impactLevel.level}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stats.joinedEvents + stats.managedEvents}
                    </div>
                    <div className="text-teal-100 text-sm">Total Activities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-md`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                  {stat.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg mr-3">
                <FaHandHoldingHeart className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Manage your community activities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className={`${card.bgColor} ${card.hoverColor} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-10% to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white text-opacity-90 text-sm mb-3">
                      {card.description}
                    </p>
                    
                    {/* Count or Badge */}
                    {card.count !== undefined ? (
                      <div className="mt-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                        <span className="text-2xl font-bold">
                          {card.count}
                        </span>
                        <span className="text-sm text-white text-opacity-80 ml-1">
                          active
                        </span>
                      </div>
                    ) : card.badge ? (
                      <div className="mt-2 px-3 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm text-sm font-medium">
                        {card.badge}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Motivation Section */}
          <div className="bg-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
            <div className="max-w-2xl mx-auto">
              <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-white opacity-80" />
              <h3 className="text-2xl font-bold mb-4">
                Every Action Creates Ripples of Change
              </h3>
              <p className="text-teal-100 text-lg mb-6">
                Your {stats.joinedEvents + stats.managedEvents} activities have touched countless lives. 
                Keep inspiring others with your commitment to community service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/events"
                  className="bg-white text-teal-600 hover:bg-teal-50 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Explore More Events
                </Link>
                <Link
                  to="/community"
                  className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Share Your Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add shine animation to CSS */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Dashboard;