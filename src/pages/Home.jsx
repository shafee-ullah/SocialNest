import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import uniceflogo from "../assets/unicef.png";
import savethechildren from "../assets/save the children.png";
import braclogo from "../assets/brac.png";
import {
  FaCalendarPlus,
  FaUsers,
  FaMapMarkerAlt,
  FaChartLine,
  FaHeart,
  FaClock,
  FaHandshake,
  FaStar,
  FaArrowRight,
  FaArrowLeft,
  FaCalendar,
  FaMapMarker,
  FaUserFriends,
  FaHandHoldingHeart,
  FaTree,
  FaGraduationCap,
  FaRobot,
  FaPaperPlane,
} from "react-icons/fa";
import SocialNestChatbot from "../components/chatbot/SocialNestChatbot";

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
  "https://images.unsplash.com/photo-1597700112072-fa3c1d930655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1929",
  "https://plus.unsplash.com/premium_photo-1683134055585-3d84cb07b60e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
  "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80",
];

const galleryTitles = [
  "Community Cleanup Drive",
  "Food Donation Campaign",
  "Tree Plantation Event",
  "Education Workshop",
  "Health Awareness Camp",
  "Blood Donation Drive",
];

const testimonials = [
  {
    id: 1,
    name: "Brandon Williams",
    role: "Volunteer",
    content:
      "Volunteering through SocialNest has been an incredible experience. I've met amazing people and made a real difference in my community.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Event Organizer",
    content:
      "As an organizer, SocialNest has made it so easy to find dedicated volunteers. The platform is intuitive and the support team is fantastic!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Community Leader",
    content:
      "The impact we've been able to create through SocialNest events has been transformative for our neighborhood. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

// Updated upcoming events with better structure
const upcomingEvents = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    date: "2024-01-15",
    location: "Santa Monica Beach",
    image:
      "https://images.unsplash.com/photo-1610093366806-b2907e880fb7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    volunteers: 45,
    description: "Join us for a coastal cleanup to protect marine life.",
  },
  {
    id: 2,
    title: "Food Distribution",
    date: "2024-01-20",
    location: "Downtown Community",
    image:
      "https://plus.unsplash.com/premium_photo-1663040337189-fa6906bf2bc4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    volunteers: 30,
    description: "Help distribute food to families in need.",
  },
  {
    id: 3,
    title: "Tree Plantation Event",
    date: "2024-01-25",
    location: "City Park",
    image:
      "https://plus.unsplash.com/premium_photo-1664478143706-183dd7a46dc4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
    volunteers: 60,
    description: "Plant trees and contribute to a greener environment.",
  },
  {
    id: 4,
    title: "Education Workshop",
    date: "2024-02-01",
    location: "Primary School",
    image:
      "https://images.unsplash.com/photo-1759456629213-3db5a7bb53ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=626",
    volunteers: 25,
    description: "Teach underprivileged children basic literacy skills.",
  },
];

// Updated partners with relevant social development organization images
const partners = [
  {
    name: "Save The Children",
    logo: savethechildren
  },
  {
    name: "UNICEF",
    logo: uniceflogo,
  },
  {
    name: "Care Bangladesh",
    logo: "https://thegpsa.org/wp-content/uploads/2021/08/logo-care.png",
  },
  {
    name: "Brac",
    logo: braclogo,
  },
  {
    name: "ChildFund",
    logo: "https://childfundalliance.org/wp-content/uploads/2022/03/CFA-Logo_RGB_hi-res.png",
  },
];

const featuredVolunteers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Community Leader",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    hours: 120,
    events: 15,
    badge: "🏆 Super Volunteer",
    quote: "Every small action creates a ripple of positive change.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Environmental Activist",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    hours: 95,
    events: 12,
    badge: "🌱 Eco Champion",
    quote: "Together we can build a sustainable future for all.",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Education Volunteer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    hours: 110,
    events: 14,
    badge: "📚 Learning Mentor",
    quote: "Education is the most powerful tool for change.",
  },
];

// NEW: Event Categories Section
const eventCategories = [
  {
    icon: <FaTree />,
    title: "Environmental",
    count: "45 Events",
    description:
      "Tree planting, cleanups, and conservation efforts to protect our planet",
  },
  {
    icon: <FaGraduationCap />,
    title: "Education",
    count: "32 Events",
    description:
      "Tutoring, workshops, and skill development programs for all ages",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Social Welfare",
    count: "28 Events",
    description: "Food drives, shelter support, and community aid initiatives",
  },
  {
    icon: <FaHeart />,
    title: "Healthcare",
    count: "15 Events",
    description: "Medical camps, health awareness drives, and wellness support",
  },
];

// NEW: Recent Success Stories
const successStories = [
  {
    id: 1,
    title: "Community Garden",
    description:
      "Transformed vacant lot into thriving community garden serving 200+ families",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
    impact: "200+ Families Fed",
    volunteers: 50,
  },
  {
    id: 2,
    title: "Literacy Program Success",
    description: "Taught 150+ adults basic literacy skills in 6-month program",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
    impact: "150+ Adults Educated",
    volunteers: 35,
  },
  {
    id: 3,
    title: "Coastal Cleanup Achievement",
    description:
      "Removed 2 tons of plastic waste from local beaches in quarterly drive",
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80",
    impact: "2 Tons Waste Removed",
    volunteers: 120,
  },
];

const Home = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const chatbotRef = useRef(null);

  const handleOpenChatbot = () => {
    if (chatbotRef.current) {
      chatbotRef.current.openModal();
    }
  };

  // NEW: Chatbot Preview State
  const [chatMessages, setChatMessages] = useState([
    {
      role: "model",
      content:
        "🌿 Hello! I'm your SocialNest AI Assistant. I can help you explore community events, create social initiatives, and connect with volunteers making a difference. How can I assist you today? 🤝",
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickQuestions = [
    "How do I join a community event?",
    "How can I create my own social event?",
    "What is the purpose of SocialNest?",
    "How do I track my volunteer impact?",
    "How can organizations collaborate on SocialNest?",
  ];

  // NEW: Chatbot responses
  const chatbotResponses = {
    "How do I join a community event?":
      "Joining an event is easy! 🎯\n\n1. Go to the 'Events' page\n2. Browse upcoming events in your area\n3. Click 'Join Now' on any event\n4. Receive confirmation and event details\n\nYou'll get reminders and can track your participation! 📅",

    "How can I create my own social event?":
      "Creating events is simple! 🌟\n\n1. Click 'Create Event' in your dashboard\n2. Fill in event details (title, date, location)\n3. Set volunteer requirements\n4. Add description and photos\n5. Publish and share with the community\n\nWe'll help promote your event to local volunteers! 🚀",

    "What is the purpose of SocialNest?":
      "SocialNest connects people who want to make a difference! 💫\n\n• 🤝 Bring communities together through social service\n• 🌱 Empower local change-makers\n• 📊 Track collective impact\n• 🎯 Make volunteering accessible to everyone\n\nWe believe small actions create big changes!",

    "How do I track my volunteer impact?":
      "Track your amazing impact! 📈\n\n• View your personal dashboard\n• See hours volunteered and events attended\n• Earn badges and recognition\n• Monitor community impact metrics\n• Download your volunteer certificate\n\nEvery hour counts toward positive change! ⏱️",

    "How can organizations collaborate on SocialNest?":
      "Perfect for organizations! 🏢\n\n• Partner with us for large-scale events\n• Access dedicated volunteer networks\n• Co-host community initiatives\n• Get impact analytics and reports\n• Featured placement on our platform\n\nLet's create lasting change together! 🌍",
  };

  // NEW: Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // NEW: Handle question click
  const handleQuestionClick = (question) => {
    // Add user question to chat
    setChatMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const response =
        chatbotResponses[question] ||
        "I'd be happy to help you with that! Please visit our help center or ask me another question. 💫";

      setChatMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: response,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // NEW: Auto-cycle through questions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % quickQuestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for counters
  const { ref: counterRef, inView: counterInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === upcomingEvents.length - 1 ? 0 : prev + 1
    );
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === 0 ? upcomingEvents.length - 1 : prev - 1
    );
  };

  // Auto-slide events
  useEffect(() => {
    const timer = setInterval(nextEvent, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-teal-600 to-green-400">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1500&q=80"
          alt="Community Service Banner"
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

      {/* Event Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Event Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover meaningful ways to contribute to your community through
              various social development initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                {React.cloneElement(category.icon, {
                  className: "w-7 h-7 text-teal-600 dark:text-teal-400",
                })}
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/events"
              className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FaCalendarPlus className="w-5 h-5 mr-2" />
              View All Events
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - UPDATED with better alignment */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className=" mb-10">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            {/* <a
              href="/events"
              className="flex items-center text-teal-600 hover:text-teal-700 font-semibold"
            >
              View All Events
              <FaArrowRight className="ml-2" />
            </a> */}
          </div>

          <div className="relative">
            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details - Properly Aligned */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaCalendar className="w-4 h-4 mr-3 text-teal-600 flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaMapMarker className="w-4 h-4 mr-3 text-teal-600 flex-shrink-0" />
                        <span className="text-sm">{event.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaUserFriends className="w-4 h-4 mr-3 text-teal-600 flex-shrink-0" />
                        <span className="text-sm">
                          {event.volunteers} volunteers registered
                        </span>
                      </div>
                    </div>

                    {/* Join Button */}
                    {/* <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaUsers className="mr-1" />
                        {event.volunteers} spots left
                      </div>
                      <a
                        href="/events"
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow hover:shadow-md"
                      >
                        Join Now
                      </a>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            {/* <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevEvent}
                className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition shadow-md"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextEvent}
                className="p-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition shadow-md"
              >
                <FaArrowRight />
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* NEW: AI Chatbot Preview Section */}
      <section className="py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4">
              <FaRobot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Your AI Community Assistant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get instant help with event planning, volunteering, and making an
              impact in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Chat Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Chat Header */}
              <div className="bg-teal-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FaRobot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      SocialNest AI Assistant
                    </h3>
                    <p className="text-teal-100 text-sm">Always here to help</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-teal-600 text-white rounded-br-none"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-medium">
                  Quick questions you can ask:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="text-xs bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-800 px-3 py-2 rounded-full transition-colors border border-teal-200 dark:border-teal-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Smart Community Assistance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <FaCalendarPlus className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Event Planning Help
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Get guidance on creating successful community events
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <FaUsers className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Volunteer Support
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Find the perfect events and track your impact
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <FaChartLine className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Impact Insights
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Understand your contribution to community development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to Get Help?</h3>
                <p className="mb-4 text-teal-100">
                  Our AI assistant is available 24/7 to help you make a
                  difference in your community.
                </p>
                <button
                  onClick={handleOpenChatbot}
                  className="w-full bg-white dark:bg-secondary-800 text-primary-600 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FaRobot className="w-4 h-4 mr-2" />
                  Start Full Chat Experience
                </button>
              </div>

              {/* Auto-scrolling Question Preview */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Try asking:
                  </span>
                  <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-2 py-1 rounded-full">
                    Live Demo
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaRobot className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {quickQuestions[currentQuestionIndex]}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleQuestionClick(
                          quickQuestions[currentQuestionIndex]
                        )
                      }
                      className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full transition-colors flex-shrink-0"
                    >
                      <FaPaperPlane className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section ref={counterRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Community Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarPlus className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {counterInView ? (
                  <CountUp end={120} suffix="+" duration={2.5} />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Events Organized
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {counterInView ? (
                  <CountUp end={2000} suffix="+" duration={2.5} />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Volunteers Joined
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 dark:bg-teal-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {counterInView ? (
                  <CountUp end={5000} suffix="+" duration={2.5} />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Hours Contributed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Success Stories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Recent Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {story.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full font-semibold">
                      {story.impact}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {story.volunteers} volunteers
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organizations Section - UPDATED with relevant images */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Trusted Partners
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Together with our partners, we make change happen and create lasting
            impact in communities worldwide.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Volunteers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className=" mb-10">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Heroes of the Month
            </h2>
            {/* <a
              href="/leaderboard"
              className="flex items-center text-teal-600 hover:text-teal-700 font-semibold"
            >
              Meet All Heroes
              <FaArrowRight className="ml-2" />
            </a> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVolunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={volunteer.image}
                    alt={volunteer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-500"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {volunteer.badge}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {volunteer.name}
                </h3>
                <p className="text-teal-600 dark:text-teal-400 mb-4">
                  {volunteer.role}
                </p>

                <div className="flex justify-center space-x-6 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <div className="font-semibold text-lg">
                      {volunteer.hours}h
                    </div>
                    <div>Volunteered</div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {volunteer.events}
                    </div>
                    <div>Events</div>
                  </div>
                </div>

                <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 text-sm leading-relaxed">
                  "{volunteer.quote}"
                </blockquote>

                <div className="flex justify-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="w-4 h-4" />
                  ))}
                </div>
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
                  alt={galleryTitles[idx]}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">
                    {galleryTitles[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Volunteers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-teal-500"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-teal-600 dark:text-teal-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex mt-4 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
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
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* Ai Chatbot */}
      <SocialNestChatbot ref={chatbotRef} />
    </div>
  );
};

export default Home;
