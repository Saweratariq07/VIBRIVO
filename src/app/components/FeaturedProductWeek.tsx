import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingCart, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

export function FeaturedProductWeek() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 34, seconds: 56 });
  const [isFavorite, setIsFavorite] = useState(false);
  const { convertPrice } = useCurrency();
  const { addToCart } = useCart();

  const featuredProduct = {
    id: 'winter-heritage-sweater',
    name: 'Winter Heritage Sweater',
    description: 'Hand-crafted luxury cashmere sweater with timeless herringbone pattern. Limited edition piece made from sustainable materials.',
    price: 199,
    originalPrice: 259,
    discount: 23,
    rating: 4.9,
    reviewCount: 856,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    features: [
      '100% Premium Cashmere',
      'Hand-Crafted in Scotland',
      'Limited Edition - Only 50 Pieces',
      'Eco-Friendly Production',
      'Lifetime Quality Guarantee'
    ]
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: featuredProduct.image,
      quantity: 1,
      size: 'M',
    });
  };

  const stockPercentage = (featuredProduct.stockCount / 100) * 100;

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.charcoal }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" style={{ color: colors.gold }} />
            <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: colors.gold }}>
              Limited Edition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Product of the Week
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Exclusive handcrafted piece with limited availability. Once it's gone, it's gone forever.
          </p>
        </motion.div>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Product Images */}
            <div className="relative bg-gray-50 p-8 lg:p-12">
              {/* Badge */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <span className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold shadow-lg">
                  Save {featuredProduct.discount}%
                </span>
                <span className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-bold shadow-lg">
                  Only {featuredProduct.stockCount} Left!
                </span>
              </div>

              {/* Main Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Product Name */}
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.charcoal }}>
                {featuredProduct.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5"
                      fill={index < Math.floor(featuredProduct.rating) ? '#FFA500' : 'none'}
                      style={{ color: index < Math.floor(featuredProduct.rating) ? '#FFA500' : '#E5E7EB' }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {featuredProduct.rating} ({featuredProduct.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredProduct.description}
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-2">
                {featuredProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.teal }} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Stock Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Availability</span>
                  <span className="text-sm font-semibold text-orange-600">
                    Hurry! Only {featuredProduct.stockCount} left
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stockPercentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold" style={{ color: colors.charcoal }}>
                  {convertPrice(featuredProduct.price)}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  {convertPrice(featuredProduct.originalPrice)}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-bold rounded-full">
                  You Save {featuredProduct.discount}%
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="mb-8 p-4 rounded-xl border-2" style={{ borderColor: colors.gold, backgroundColor: '#FEF3C7' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5" style={{ color: colors.gold }} />
                  <span className="font-semibold" style={{ color: colors.charcoal }}>
                    Sale Ends In:
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Mins' },
                    { value: timeLeft.seconds, label: 'Secs' },
                  ].map((time, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white rounded-lg p-3 mb-1 shadow-sm">
                        <span className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                          {String(time.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{time.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all"
                  style={{ backgroundColor: colors.teal }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-4 rounded-full border-2 transition-all"
                  style={{
                    borderColor: isFavorite ? colors.teal : colors.charcoal,
                    backgroundColor: isFavorite ? colors.teal : 'white',
                    color: isFavorite ? 'white' : colors.charcoal,
                  }}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* View Product Link */}
              <Link
                to={`/product/${featuredProduct.id}`}
                className="text-center mt-4 text-sm font-semibold hover:underline"
                style={{ color: colors.gold }}
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
