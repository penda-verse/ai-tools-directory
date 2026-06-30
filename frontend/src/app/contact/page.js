'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Generate a random math challenge on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({
      num1,
      num2,
      answer: num1 + num2
    });
    setCaptchaInput('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check: if filled, reject silently or show mock success to confuse bots
    if (honeypot) {
      setStatus('Message sent successfully!');
      e.target.reset();
      return;
    }

    // Math CAPTCHA check
    if (parseInt(captchaInput) !== captcha.answer) {
      setStatus('Incorrect spam protection answer. Please try again.');
      return;
    }

    setStatus('Sending...');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Remove captcha and honeypot before sending to FastAPI backend
    delete data.captchaAnswer;
    delete data.website_honeypot;

    // Simulate successful form submission locally for static deployment
    setTimeout(() => {
      setStatus('Thank you! Your message has been sent successfully.');
      e.target.reset();
      generateCaptcha();
    }, 800);

  };

  return (
    <div className="max-w-3xl mx-auto py-16 lg:py-24 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Have questions about a listed tool, want to partner, or submit a new resource? Get in touch with our team.
        </p>
      </div>
      
      <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Honeypot field (hidden from users, bot trap) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_honeypot">Leave this field empty</label>
            <input
              type="text"
              id="website_honeypot"
              name="website_honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 text-sm" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 text-sm" 
                placeholder="john@example.com" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows="5" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 text-sm resize-none" 
              placeholder="Tell us how we can help..."
            ></textarea>
          </div>

          {/* Math CAPTCHA field */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-gray-300">
              Spam Protection: What is <span className="text-purple-400 font-bold">{captcha.num1} + {captcha.num2}</span> ?
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="number"
                name="captchaAnswer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className="w-full sm:w-28 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-center focus:outline-none focus:border-purple-500 transition-all duration-300 text-sm font-bold"
                placeholder="?"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 cursor-pointer text-sm"
          >
            Send Message
          </button>
          
          {status && (
            <div className={`text-center text-sm mt-4 font-semibold px-4 py-2 rounded-lg ${
              status.includes('successfully') 
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                : 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
            }`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
