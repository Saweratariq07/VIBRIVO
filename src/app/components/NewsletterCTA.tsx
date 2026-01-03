import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle } from 'lucide-react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.charcoal }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{ backgroundColor: colors.teal }}>
              <Mail className="w-8 h-8" style={{ color: colors.charcoal }} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join the VIBRIVO Family
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get <span className="font-bold" style={{ color: colors.teal }}>10% off your first order</span>. Be the first to know about new arrivals, exclusive offers, and sustainability initiatives.
          </p>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-full text-base outline-none transition-all"
                  style={{ 
                    backgroundColor: 'white',
                    color: colors.charcoal,
                    border: `2px solid transparent`
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full font-semibold text-white transition-all shadow-lg"
                  style={{ backgroundColor: colors.teal }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="w-6 h-6" style={{ color: colors.teal }} />
                <span className="text-lg font-semibold">Thank you for subscribing!</span>
              </div>
              <p className="text-gray-300">Check your email for your 10% discount code.</p>
            </motion.div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-700">
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Exclusive Offers</h4>
              <p className="text-sm text-gray-400">Members-only discounts and early access to sales</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">New Arrivals</h4>
              <p className="text-sm text-gray-400">Be the first to shop our latest collections</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Style Tips</h4>
              <p className="text-sm text-gray-400">Expert fashion advice and styling guides</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
