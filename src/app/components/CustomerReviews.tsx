import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  productName: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'New York, NY',
    rating: 5,
    review: 'The quality is absolutely exceptional! This cashmere sweater is incredibly soft and luxurious. Worth every penny. I\'ve received so many compliments!',
    productName: 'Premium Cashmere Sweater',
    date: 'December 2024',
    verified: true,
  },
  {
    id: '2',
    name: 'James Patterson',
    location: 'Los Angeles, CA',
    rating: 5,
    review: 'Best purchase I\'ve made this year. The craftsmanship is outstanding and the fit is perfect. VIBRIVO has become my go-to brand for premium knitwear.',
    productName: 'Winter Heritage Sweater',
    date: 'December 2024',
    verified: true,
  },
  {
    id: '3',
    name: 'Emily Chen',
    location: 'Seattle, WA',
    rating: 5,
    review: 'I love the sustainable approach and the sweater feels amazing. The customer service was excellent too. Fast shipping and beautiful packaging!',
    productName: 'Sustainable Cotton Knit',
    date: 'November 2024',
    verified: true,
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    location: 'Chicago, IL',
    rating: 5,
    review: 'Incredibly soft and warm. Perfect for the cold weather. The quality exceeded my expectations. This is true luxury at an affordable price.',
    productName: 'Merino Wool Knit',
    date: 'November 2024',
    verified: true,
  },
  {
    id: '5',
    name: 'Amanda Taylor',
    location: 'Boston, MA',
    rating: 5,
    review: 'Absolutely stunning! The attention to detail is remarkable. I appreciate the eco-friendly packaging and the ethical production. Highly recommend!',
    productName: 'Essential Turtleneck',
    date: 'December 2024',
    verified: true,
  },
  {
    id: '6',
    name: 'David Kim',
    location: 'San Francisco, CA',
    rating: 5,
    review: 'Premium quality that actually lasts. I\'ve washed mine several times and it still looks brand new. The fit is true to size and very comfortable.',
    productName: 'Modern Cardigan',
    date: 'October 2024',
    verified: true,
  },
];

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + reviewsPerView >= reviews.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, reviews.length - reviewsPerView) : prev - 1
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerView);
  
  // Fill remaining slots if needed
  while (visibleReviews.length < reviewsPerView && reviews.length > 0) {
    visibleReviews.push(reviews[visibleReviews.length % reviews.length]);
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = 1577; // Total review count across all products

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
            What Our Customers Are Saying
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-6 h-6"
                  fill="#FFA500"
                  style={{ color: '#FFA500' }}
                />
              ))}
            </div>
            <span className="text-lg font-semibold" style={{ color: colors.charcoal }}>
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-gray-600">
            Based on {totalReviews.toLocaleString()}+ verified reviews
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:block"
            style={{ color: colors.charcoal }}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex + reviewsPerView >= reviews.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:block"
            style={{ color: colors.charcoal }}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="sync">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={`${review.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-16 h-16" style={{ color: colors.gold }} />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="w-5 h-5"
                        fill={starIndex < review.rating ? '#FFA500' : 'none'}
                        style={{ color: starIndex < review.rating ? '#FFA500' : '#E5E7EB' }}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                    "{review.review}"
                  </p>

                  {/* Product Name */}
                  <p className="text-sm font-semibold mb-4" style={{ color: colors.gold }}>
                    {review.productName}
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-semibold" style={{ color: colors.charcoal }}>
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: colors.teal, color: 'white' }}>
                        <span className="font-semibold">✓ Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {Array.from({ length: Math.ceil(reviews.length / reviewsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * reviewsPerView)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: Math.floor(currentIndex / reviewsPerView) === index ? colors.gold : '#D1D5DB',
                }}
                aria-label={`Go to reviews ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Read More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
            style={{ backgroundColor: colors.charcoal, color: 'white' }}
          >
            Read More Reviews
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}