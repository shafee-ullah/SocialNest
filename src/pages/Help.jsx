import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEnvelope, FaPhone, FaCommentDots, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Register" button in the top-right corner of the page and follow the registration process.'
        },
        {
          question: 'Is there a mobile app available?',
          answer: 'Currently, we offer a mobile-responsive website that works on all devices. A native mobile app is coming soon.'
        },
      
      ]
    },
    {
      id: 'events',
      title: 'Events',
      questions: [
        {
          question: 'How do I create an event?',
          answer: 'First login to your account, then Click on "Create Event" in the navigation bar, fill in the event details, and submit the form.'
        },
       
        {
          question: 'How do I update my events?',
          answer: 'You can update your events by going to the manage events page and clicking the "Edit" button.'
        }
        
      ]
    },
    // {
    //   id: 'account',
    //   title: 'Account & Settings',
    //   questions: [
    //     {
    //       question: 'How do I update my profile information?',
    //       answer: 'After logging in, click on your profile picture in the top-right corner and select "Profile". Here you can update your display name, profile picture, and other personal information.'
    //     },
    //     {
    //       question: 'How do I change my email notification preferences?',
    //       answer: 'Go to your Profile page and click on "Notification Settings". Here you can choose which types of emails you want to receive about events and updates.'
    //     },
    //     {
    //       question: 'How do I connect my social media accounts?',
    //       answer: 'In your Profile settings, navigate to the "Connected Accounts" section. From there, you can link your Google or other social media accounts for easier login.'
    //     }
    //   ]
    // },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      questions: [
        {
          question: 'I can\'t log in to my account. What should I do?',
          answer: 'First, make sure you\'re using the correct email and password. If you\'ve forgotten your password, use the "Forgot Password" link on the login page. If you\'re still having issues, try clearing your browser cache or using a different browser.'
        },
        {
          question: 'Why can\'t I see the events I\'m interested in?',
          answer: 'Make sure you\'re logged in and your profile information is up to date. Some events might be private or require specific permissions. Try refreshing the page or checking your internet connection.'
        },
        {
          question: 'The page is loading slowly or not displaying correctly',
          answer: 'Try these steps: 1) Clear your browser cache and cookies 2) Make sure your browser is up to date 3) Check your internet connection 4) Try accessing from a different device or browser. If the problem persists, please contact our support team.'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">How can we help you today?</p>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                  {activeCategory === category.id ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {activeCategory === category.id && (
                  <div className="px-6 pb-6 space-y-4">
                    {category.questions.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                No results found for "{searchQuery}". Try different keywords or check out our <Link to="/faq" className="text-primary-600 dark:text-primary-400 hover:underline">FAQ page</Link>.
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-16 bg-white dark:bg-gray-800 shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Still need help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <FaEnvelope className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">We'll respond within 24 hours</p>
              <a href="mailto:support@socialnest.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                support@socialnest.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <FaPhone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Monday - Friday, 9am - 5pm EST</p>
              <a href="tel:+11234567890" className="text-primary-600 dark:text-primary-400 hover:underline">
                +1 (123) 456-7890
              </a>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                <FaCommentDots className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Chat with our support team</p>
              <button className="text-primary-600 dark:text-primary-400 hover:underline">
                Start Chat
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
