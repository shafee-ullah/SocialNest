import React from 'react';
import { FaHeart, FaHandsHelping, FaUsers, FaGlobeAmericas, FaCalendarPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Smith Jones',
      role: 'Founder & CEO',
      bio: 'Passionate about social change and community building.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Jane Smith',
      role: 'Community Manager',
      bio: 'Dedicated to connecting people through meaningful events.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Alex Johnson',
      role: 'Event Coordinator',
      bio: 'Expert in organizing impactful community events.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const stats = [
    { count: '500+', label: 'Events Organized', icon: <FaCalendarPlus className="w-8 h-8" /> },
    { count: '10K+', label: 'Volunteers', icon: <FaUsers className="w-8 h-8" /> },
    { count: '50+', label: 'Communities Served', icon: <FaGlobeAmericas className="w-8 h-8" /> },
    { count: '100%', label: 'Dedicated Team', icon: <FaHeart className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SocialNest</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Connecting communities through meaningful social service events
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At SocialNest, we believe in the power of community and the impact of collective action. 
              Our platform connects passionate individuals with meaningful volunteer opportunities, 
              making it easier than ever to give back and make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-teal-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.count}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate individuals dedicated to making a difference in communities worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={member.image} 
                    alt={member.name}
                  className="w-full h-64 object-cover"
                  />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of volunteers and start creating positive change today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-colors"
            >
              Browse Events
            </Link>
            <Link
              to="/create-event"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-md font-medium text-lg transition-colors"
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
