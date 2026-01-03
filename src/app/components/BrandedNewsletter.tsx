import { motion } from 'motion/react';
import { useState } from 'react';

export function BrandedNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! A 10% discount code has been sent to ${email}`);
    setEmail('');
  };

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1ED2AF 0%, #17c5a3 50%, #0fb896 100%)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white font-bold tracking-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="text-xl text-white/90 mb-12 font-light">
            Join 50,000+ subscribers for exclusive offers and early access
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 rounded-xl text-lg bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white outline-none transition-all placeholder:text-gray-400"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#111111] text-white px-12 py-5 rounded-xl text-lg font-semibold hover:bg-[#2A2A2A] transition-all shadow-xl hover:shadow-2xl"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-white/70 text-sm mt-6 font-light">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
