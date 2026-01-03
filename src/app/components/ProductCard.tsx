import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  badge?: {
    text: string;
    type: 'bestseller' | 'limited' | 'new' | 'sale';
  };
  discount?: number;
  onQuickView?: () => void;
  inStock?: boolean;
  stockCount?: number;
}

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  rating,
  reviewCount,
  badge,
  discount,
  onQuickView,
  inStock = true,
  stockCount,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { convertPrice } = useCurrency();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
      size: 'M', // Default size
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.();
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        {/* Product Image Container */}
        <div className="relative overflow-hidden rounded-t-lg bg-gray-50 aspect-square p-4">
          {/* Badges - Top Left */}
          {(badge || discount || (stockCount && stockCount <= 5)) && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {badge && (
                <span 
                  className="px-2.5 py-1 rounded text-xs font-semibold text-white uppercase tracking-wide"
                  style={{ 
                    backgroundColor: 
                      badge.type === 'bestseller' ? colors.gold :
                      badge.type === 'limited' ? '#DC2626' :
                      badge.type === 'new' ? colors.teal :
                      '#F59E0B'
                  }}
                >
                  {badge.text}
                </span>
              )}
              {discount && (
                <span className="px-2.5 py-1 rounded text-xs font-semibold text-white bg-red-600 uppercase tracking-wide">
                  Save {discount}%
                </span>
              )}
              {stockCount && stockCount <= 5 && (
                <span className="px-2.5 py-1 rounded text-xs font-semibold text-white bg-orange-500 uppercase tracking-wide">
                  Only {stockCount} Left
                </span>
              )}
            </div>
          )}

          {/* Product Image with Zoom Effect */}
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={isHovered && hoverImage ? hoverImage : image}
              alt={name}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Hover Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!inStock}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add To Cart
            </motion.button>
            
            {onQuickView && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-colors"
                style={{ color: colors.charcoal }}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-colors"
              style={{ color: isFavorite ? '#DC2626' : colors.charcoal }}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          </motion.div>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg uppercase tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Product Title */}
          <h3 className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-900 transition-colors min-h-[40px]">
            {name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4"
                  fill={index < Math.floor(rating) ? '#FFA500' : 'none'}
                  style={{ color: index < Math.floor(rating) ? '#FFA500' : '#E5E7EB' }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: colors.charcoal }}>
                {convertPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {convertPrice(originalPrice)}
                </span>
              )}
            </div>
            {originalPrice && discount && (
              <div className="inline-flex">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  You Save {discount}%
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}