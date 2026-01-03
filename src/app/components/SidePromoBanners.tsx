import { useState, useEffect } from 'react';
import { X, Gift, Truck, ShieldCheck, Clock, Zap, Tag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidePromoBannersProps {
  showBenefitsBanner?: boolean;
  showPromoBanner?: boolean;
}

export function SidePromoBanners({ 
  showBenefitsBanner = true, 
  showPromoBanner = true 
}: SidePromoBannersProps = {}) {
  const [showLeftBanner, setShowLeftBanner] = useState(true);
  const [showRightBanner, setShowRightBanner] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show banners after scrolling past hero (300px)
  const shouldShow = scrollPosition > 300 && scrollPosition < 3000;

  return (
    <>
      {/* LEFT SIDE BANNER - Promotional Offer */}
      <AnimatePresence>
        {showPromoBanner && showLeftBanner && shouldShow && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="fixed left-0 top-1/3 z-40 hidden lg:block"
          >
            <div className="bg-gradient-to-br from-[#1ED2AF] to-[#19b899] text-white p-6 rounded-r-2xl shadow-2xl w-64 relative">
              <button
                onClick={() => setShowLeftBanner(false)}
                className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-6 h-6" />
                <span className="font-bold text-lg">FIRST ORDER</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Save 10%</h3>
              <p className="text-sm mb-4 opacity-90">Use code: WELCOME</p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center mb-4">
                <p className="font-mono font-bold tracking-wider">WELCOME</p>
              </div>
              
              <button className="w-full bg-white text-[#1ED2AF] py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
              
              <div className="mt-3 text-xs opacity-80 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Limited Time Offer</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT SIDE BANNER - Free Shipping & Benefits */}
      <AnimatePresence>
        {showBenefitsBanner && showRightBanner && shouldShow && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="fixed right-0 top-1/3 z-40 hidden lg:block"
          >
            <div className="bg-gradient-to-br from-[#111111] to-[#2a2a2a] text-white p-6 rounded-l-2xl shadow-2xl w-64 relative border-l-4 border-[#C7A14A]">
              <button
                onClick={() => setShowRightBanner(false)}
                className="absolute top-2 left-2 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="space-y-4 mt-6">
                {/* Free Shipping */}
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <div className="bg-[#1ED2AF]/20 p-2 rounded-lg">
                    <Truck className="w-5 h-5 text-[#1ED2AF]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Free U.S. Shipping</p>
                    <p className="text-xs text-gray-400">On orders $150+</p>
                  </div>
                </div>

                {/* Secure Checkout */}
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <div className="bg-[#C7A14A]/20 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-[#C7A14A]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">SSL Secure</p>
                    <p className="text-xs text-gray-400">100% Protected</p>
                  </div>
                </div>

                {/* Fast Delivery */}
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <div className="bg-[#1ED2AF]/20 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-[#1ED2AF]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Fast Delivery</p>
                    <p className="text-xs text-gray-400">2-3 Business Days</p>
                  </div>
                </div>

                {/* VIP Member */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#C7A14A]/20 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-[#C7A14A]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">VIP Rewards</p>
                    <p className="text-xs text-gray-400">Earn with every order</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE STICKY BOTTOM PROMO BAR */}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gradient-to-r from-[#1ED2AF] to-[#19b899] text-white p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <div>
                  <p className="font-bold text-sm">10% OFF First Order</p>
                  <p className="text-xs opacity-90">Code: WELCOME</p>
                </div>
              </div>
              <button className="bg-white text-[#1ED2AF] px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}