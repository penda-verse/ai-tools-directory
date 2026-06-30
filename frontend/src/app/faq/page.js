'use client';

import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    { 
      question: 'What is the Business AI Tools Directory?', 
      answer: 'We are a curated index of the absolute best artificial intelligence tools designed to improve productivity, automation, marketing, development, HR, and finance workflows in modern corporate and office environments.' 
    },
    { 
      question: 'How do you choose which tools to list?', 
      answer: 'Each tool is manually audited based on its business applicability, usability, feature set, user feedback, and pricing transparency. We ensure listed tools provide real-world value to professionals.' 
    },
    { 
      question: 'Is this directory free to use?', 
      answer: 'Yes, this directory is 100% free to browse and use. Users can search and filter tools across various industries at zero cost.' 
    },
    { 
      question: 'How can I submit my own business AI tool?', 
      answer: 'You can submit your tool by navigating to our Contact Us page and sending us details such as the tool name, pricing model, website URL, and a short description. Our editorial team will review it.' 
    },
    {
      question: 'Do you offer reviews and pricing details?',
      answer: 'Yes, each tool has a dedicated details page highlighting its features, exact pricing models (Free, Freemium, or Paid), direct website link, and user ratings.'
    }
  ];

  // Keep track of open indices in state
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Page Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto py-16 lg:py-24 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Inject FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Find quick answers to common questions about our AI tools catalog and submission process.
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-white hover:text-purple-400 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'text-gray-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 border-t border-white/5 bg-white/5' : 'max-h-0'
                }`}
              >
                <div className="p-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
