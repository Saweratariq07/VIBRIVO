import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Sparkles } from 'lucide-react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('exitPopupSeen');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true);
        localStorage.setItem('exitPopupSeen', 'true');
      }
    };

    // Add event listener after 3 seconds
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" style={{ color: colors.charcoal }} />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12 text-center">
                {!isSubscribed ? (
                  <>
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="p-4 rounded-full" style={{ backgroundColor: colors.teal }}>
                          <Gift className="w-12 h-12 text-white" />
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                          className="absolute -top-2 -right-2"
                        >
                          <Sparkles className="w-6 h-6" style={{ color: colors.gold }} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.charcoal }}>
                      Wait! Don't Miss Out
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg text-gray-600 mb-6">
                      Get <span className="font-bold" style={{ color: colors.teal }}>10% OFF</span> your first order
                    </p>

                    {/* Benefits */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                      <ul className="space-y-3">
                        {[
                          'Exclusive access to new collections',
                          'Early bird discounts & flash sales',
                          'Free shipping on orders over $150',
                          'Styling tips from our experts'
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: colors.teal }}>
                              ✓
                            </span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors text-center"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all"
                        style={{ backgroundColor: colors.teal }}
                      >
                        Get My 10% Discount
                      </motion.button>
                    </form>

                    {/* Fine Print */}
                    <p className="text-xs text-gray-400 mt-4">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="py-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.teal }}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-3" style={{ color: colors.charcoal }}>
                        Welcome to the Family!
                      </h3>
                      <p className="text-gray-600">
                        Check your email for your exclusive 10% discount code.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-5" style={{ backgroundColor: colors.gold, borderRadius: '0 0 100% 0' }} />
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5" style={{ backgroundColor: colors.teal, borderRadius: '100% 0 0 0' }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
