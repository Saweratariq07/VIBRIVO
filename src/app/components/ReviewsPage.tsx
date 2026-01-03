import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, ThumbsUp, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function ReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const reviews = [
    { id: 1, name: 'Sarah Williams', rating: 5, date: '2 days ago', text: 'Love the minimalist aesthetic, highly recommend! VIBRIVO has become my favorite brand for quality basics. The free shipping was a huge bonus!', verified: true, helpful: 45, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', product: 'Classic Cashmere Crewneck' },
    { id: 2, name: 'Michael Johnson', rating: 5, date: '1 week ago', text: 'Perfect for chilly evenings – super cozy and stylish! The fit is true to size and the material feels incredibly premium. Best purchase I\'ve made this year.', verified: true, helpful: 38, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', product: 'Merino Wool V-Neck' },
    { id: 3, name: 'Emily Davis', rating: 5, date: '2 weeks ago', text: 'The quality is exceptional, worth every penny! Ideal for my weekend getaway. The cashmere sweater has become my go-to piece for both work and weekends.', verified: true, helpful: 52, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', product: 'Alpaca Blend Cardigan' },
    { id: 4, name: 'David Martinez', rating: 5, date: '3 weeks ago', text: 'Excellent customer service and fast U.S. shipping! The sweater exceeded my expectations in terms of quality. Very happy with my purchase.', verified: true, helpful: 29, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', product: 'Cotton Cashmere Pullover' },
    { id: 5, name: 'Jessica Lee', rating: 5, date: '1 month ago', text: 'Absolutely love the sustainable materials! VIBRIVO is leading the way in eco-friendly fashion. The sweater is soft, warm, and looks amazing.', verified: true, helpful: 67, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', product: 'Organic Cotton Sweater' },
    { id: 6, name: 'Robert Chen', rating: 4, date: '1 month ago', text: 'Great quality but sizing runs slightly large. I ordered a medium and it fits more like a large. Still very happy with the purchase though!', verified: true, helpful: 34, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', product: 'Heritage Wool Sweater' },
    { id: 7, name: 'Amanda Foster', rating: 5, date: '2 months ago', text: 'The limited edition collection is stunning! I bought two sweaters and both are perfect. Premium quality at a reasonable price point.', verified: true, helpful: 41, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', product: 'Winter Heritage Edition' },
    { id: 8, name: 'James Wilson', rating: 5, date: '2 months ago', text: 'Best sweater brand I\'ve ever purchased from. The attention to detail is remarkable. Will definitely be ordering more!', verified: true, helpful: 56, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', product: 'Premium Cable Knit' },
  ];

  const ratingDistribution = [
    { stars: 5, count: 8234, percentage: 92 },
    { stars: 4, count: 543, percentage: 6 },
    { stars: 3, count: 124, percentage: 1 },
    { stars: 2, count: 45, percentage: 0.5 },
    { stars: 1, count: 23, percentage: 0.5 },
  ];

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);
  const averageRating = 4.9;

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link to="/" className="text-[#1ED2AF] hover:underline mb-4 inline-block">
              ← Back to Homepage
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-600">See what our customers are saying about VIBRIVO</p>
          </motion.div>

          {/* Rating Overview */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#F5F3EE] rounded-3xl p-8 text-center"
            >
              <div className="text-6xl font-bold text-[#111111] mb-2">{averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#C7A14A] text-[#C7A14A]" />
                ))}
              </div>
              <p className="text-gray-600">Based on {totalReviews.toLocaleString()} reviews</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 bg-[#F5F3EE] rounded-3xl p-8"
            >
              <h3 className="font-bold text-[#111111] mb-4 text-xl">Rating Distribution</h3>
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-24">
                      <span className="font-bold">{item.stars}</span>
                      <Star className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                    </div>
                    <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-[#C7A14A] h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-600 w-20 text-right">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1ED2AF] outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <ChevronDown className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1ED2AF] outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#111111]">{review.name}</h3>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-[#1ED2AF]">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs">Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-[#C7A14A] text-[#C7A14A]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">· {review.product}</span>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#1ED2AF] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#111111] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#1ED2AF] transition-colors"
            >
              Load More Reviews
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
