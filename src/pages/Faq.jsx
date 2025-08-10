import React from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
  const faqs = [
    {
      question: 'How do I create an event?',
      answer: 'To create an event, click on the "Create Event" button in the navigation bar, fill in the event details, and submit the form.'
    },
    {
      question: 'How can I join an event?',
      answer: 'Browse the events page, find an event you\'re interested in, and click the "Join Event" button on the event card.'
    },
   
    {
      question: 'How do I contact event organizers?',
      answer: 'You can contact event organizers through the messaging system on the event details page.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, we only have a web application that works on all mobile browsers. A native mobile app is in development.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Find answers to common questions about SocialNest</p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</h2>
                  <svg className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 -mt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
          <Link 
            to="/help" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faq;
