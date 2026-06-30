'use client';

import React, { useState } from 'react';

export default function TipBar() {
  const [amount, setAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handlePresetClick = (val) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(val);
    setAmount(val);
  };

  const handleTipSubmit = (e) => {
    e.preventDefault();
    const finalAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);
    if (!finalAmount || finalAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1800);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/50 via-slate-900/80 to-purple-900/50 border-b border-purple-500/20 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {!isSuccess ? (
          <>
            {/* Info Message */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl animate-bounce">💖</span>
              <div>
                <p className="text-sm font-semibold">Support the AI Directory</p>
                <p className="text-xs text-gray-400">Your tips help us maintain, scale, and curate the most unique business tools.</p>
              </div>
            </div>

            {/* Tip Selection & Form */}
            <form onSubmit={handleTipSubmit} className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                {['5', '10', '25'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetClick(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isCustom && amount === val
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCustom ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>

              {isCustom && (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">$</span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="Enter amount"
                    className="bg-black/60 border border-white/10 rounded-xl pl-6 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 w-28"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  'Send Tip 🚀'
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="w-full flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse">🎉</span>
              <div>
                <p className="text-sm font-bold text-green-400">Tip Received successfully!</p>
                <p className="text-xs text-gray-300">
                  Thank you so much for your support of ${isCustom ? parseFloat(customAmount).toFixed(2) : amount}.00!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white text-xs font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
