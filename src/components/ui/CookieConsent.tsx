"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner for a better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ffd700]/10 blur-[80px] rounded-full" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ffd700]/10 flex items-center justify-center text-[#ffd700]">
                <Cookie size={28} />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-1">Cookie Consent</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fffac7] via-[#ffd700] to-[#b8860b] text-black text-sm font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Accept All
                </button>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
