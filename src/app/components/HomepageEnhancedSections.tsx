import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Heart, ChevronRight, Leaf, Recycle, Award, Truck, ShieldCheck, 
  Gift, Sparkles, Clock, TrendingUp, Zap, CheckCircle, Instagram, Flame, 
  Snowflake, Users
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface EnhancedSectionsProps {
  timeLeft: { hours: number; minutes: number; seconds: number };
  convertPrice: (price: number) => string;
  customerReviews: Array<{
    name: string;
    text: string;
    rating: number;
    image: string;
    verified: boolean;
    userPhoto?: string;
    date?: string;
  }>;
  featuredProducts: Array<{
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
  }>;
}

export function HomepageEnhancedSections({ 
  timeLeft, 
  convertPrice, 
  customerReviews, 
  featuredProducts 
}: EnhancedSectionsProps) {
  return (
    <>
      {/* SEASONAL OFFERS - Holiday Collection with Free Gift */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-[#C7A14A] to-[#b8903d] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
                <Gift className="w-5 h-5" />
                <span className="font-bold text-sm">HOLIDAY SPECIAL</span>
              </div>
              <h2 className="text-4xl md:text-5xl text-white mb-6 font-bold leading-tight">
                Shop the Holiday Collection
              </h2>
              <p className="text-2xl text-white mb-8">
                Get a Free Premium Gift with Purchases Over $100!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white text-lg">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  Free luxury gift box packaging
                </li>
                <li className="flex items-center gap-3 text-white text-lg">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  Complimentary gift card included
                </li>
                <li className="flex items-center gap-3 text-white text-lg">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  Premium cashmere scarf gift (orders $100+)
                </li>
              </ul>
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 bg-white text-[#C7A14A] px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Explore Holiday Collection
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative h-[500px] hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1607274176829-f0149a008f20?w=800"
                alt="Holiday Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 right-8 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl animate-bounce">
                Free Gift Inside!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW SECTION */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <span className="font-bold text-red-600">TRENDING NOW</span>
          </div>
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">Shop Our Most Popular Products</h2>
          <p className="text-xl text-gray-600">What everyone is buying right now!</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl mb-4 bg-white shadow-lg">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      #{idx + 1} Trending
                    </span>
                    {product.originalPrice && (
                      <span className="bg-[#1ED2AF] text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-white text-sm ml-2">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-[#111111] mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#111111]">{convertPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{convertPrice(product.originalPrice)}</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY FOCUS SECTION */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-600 px-6 py-3 rounded-full text-white mb-6 font-bold">
                <Leaf className="w-5 h-5" />
                ECO-FRIENDLY
              </div>
              <h2 className="text-5xl mb-6 text-[#111111] font-bold">Shop Eco-Friendly Sweaters</h2>
              <p className="text-xl text-gray-700 mb-8">
                100% Sustainable Materials - Better for You, Better for the Planet
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Recycle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">100% Recycled Packaging</h4>
                    <p className="text-gray-600 text-sm">All our packaging is made from recycled materials and is fully recyclable</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Organic & Natural Fibers</h4>
                    <p className="text-gray-600 text-sm">Our sweaters are made from certified organic cotton and wool</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Carbon Neutral Shipping</h4>
                    <p className="text-gray-600 text-sm">We offset 100% of our shipping emissions</p>
                  </div>
                </div>
              </div>
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-green-700 transition-all shadow-xl"
              >
                Shop Sustainable Collection
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
                  alt="Sustainable Fashion"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Our Commitment</h3>
                  <p className="text-lg">Sustainable fashion that doesn't compromise on quality or style</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-6 shadow-2xl">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">100%</p>
                  <p className="text-sm text-gray-600 font-semibold">Sustainable</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white rounded-full p-6 shadow-2xl">
                <div className="text-center">
                  <Leaf className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-sm font-bold">Eco-Certified</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
