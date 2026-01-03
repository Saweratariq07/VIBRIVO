import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, CheckCircle, Heart, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCurrency } from '../context/CurrencyContext';
import { motion } from 'motion/react';

export function BundlePage() {
  const { id } = useParams();
  const { convertPrice } = useCurrency();

  // Mock bundle data
  const bundles: any = {
    51: { 
      id: 51, 
      name: 'Minimalist Weekend', 
      price: 389, 
      originalPrice: 549, 
      items: [
        { name: 'Cashmere Sweater', price: 189, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400' },
        { name: 'Wool Pants', price: 149, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
        { name: 'Leather Bag', price: 211, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' }
      ],
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700',
      savings: 160,
      rating: 4.9,
      reviews: 456
    },
    52: { 
      id: 52, 
      name: 'Cozy Office Look', 
      price: 429, 
      originalPrice: 599, 
      items: [
        { name: 'Merino Cardigan', price: 199, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
        { name: 'Cotton Shirt', price: 89, image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400' },
        { name: 'Dress Shoes', price: 311, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400' }
      ],
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700',
      savings: 170,
      rating: 5.0,
      reviews: 523
    },
    53: { 
      id: 53, 
      name: 'Winter Getaway', 
      price: 499, 
      originalPrice: 699, 
      items: [
        { name: 'Cable Knit Sweater', price: 229, image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?w=400' },
        { name: 'Wool Scarf', price: 79, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400' },
        { name: 'Leather Boots', price: 391, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' }
      ],
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700',
      savings: 200,
      rating: 4.9,
      reviews: 389
    },
  };

  const bundle = bundles[id || '51'];

  if (!bundle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-[#111111] mb-4">Bundle Not Found</h1>
        <Link to="/" className="text-[#1ED2AF] hover:underline">Return to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Bundle Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/" className="text-[#1ED2AF] hover:underline mb-4 inline-block">
              ← Back to Homepage
            </Link>
            <h1 className="text-5xl font-bold text-[#111111] mb-4">{bundle.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C7A14A] text-[#C7A14A]" />
                ))}
                <span className="text-gray-600 ml-2">({bundle.reviews} reviews)</span>
              </div>
              <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                Save {convertPrice(bundle.savings)}
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Bundle Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src={bundle.image}
                alt={bundle.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Bundle Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-8">
                <p className="text-gray-600 mb-4">This bundle includes:</p>
                <div className="space-y-4 mb-8">
                  {bundle.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#F5F3EE] p-4 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold text-[#111111]">{item.name}</h3>
                        <p className="text-gray-600">{convertPrice(item.price)}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-[#1ED2AF]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-600 mb-1">Bundle Price:</p>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-[#111111]">{convertPrice(bundle.price)}</span>
                      <span className="text-2xl text-gray-400 line-through">{convertPrice(bundle.originalPrice)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#111111] text-white py-5 rounded-xl font-bold text-lg hover:bg-[#1ED2AF] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add Bundle to Cart
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border-2 border-[#111111] text-[#111111] py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-6 bg-[#F5F3EE] rounded-xl">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-[#1ED2AF]" />
                  <p className="text-sm font-bold">Free Shipping</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-[#1ED2AF]" />
                  <p className="text-sm font-bold">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-[#1ED2AF]" />
                  <p className="text-sm font-bold">Premium Quality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
