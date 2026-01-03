import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, Star, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[]; // Multiple images for carousel
  category: string[];
  size: string[];
  color: string[];
  material: string;
  stock: number;
  isBestSeller: boolean;
  isNew: boolean;
  features?: string[];
  customerPhotos?: string[];
}

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  // Generate multiple product images (main + 4 additional views)
  const productImages = product.images || [
    product.image,
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZGV0YWlsfGVufDF8fHx8MTczNDkxNDg3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwYmFja3xlbnwxfHx8fDE3MzQ5MTQ4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0d2VhciUyMHRleHR1cmV8ZW58MXx8fHwxNzM0OTE0ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwc2lkZXxlbnwxfHx8fDE3MzQ5MTQ4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
            Quick View
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-h-[calc(95vh-80px)] overflow-y-auto">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Carousel */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden group">
              <div
                className="relative h-[500px] cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ImageWithFallback
                      src={productImages[currentImageIndex]}
                      alt={`${product.name} - View ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      style={
                        isZoomed
                          ? {
                              transform: 'scale(2)',
                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              transition: 'transform 0.1s ease-out',
                            }
                          : {}
                      }
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom Indicator */}
                {!isZoomed && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-sm">Hover to zoom</span>
                  </div>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {productImages.length}
                </div>

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      style={{ color: colors.charcoal }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      style={{ color: colors.charcoal }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-teal-500 scale-110 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={
                      currentImageIndex === index
                        ? { borderColor: colors.teal }
                        : {}
                    }
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="flex flex-col">
            <div className="flex-1 space-y-6">
              {/* Product Name */}
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: colors.charcoal }}>
                  {product.name}
                </h3>
                
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  {product.isNew && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: colors.teal }}>
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: colors.gold }}>
                      BESTSELLER
                    </span>
                  )}
                  {product.stock <= 10 && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Only {product.stock} left!
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-gray-300'
                      }`}
                      style={
                        i < Math.floor(product.rating)
                          ? { color: colors.gold }
                          : {}
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold" style={{ color: colors.charcoal }}>
                  £{product.price}
                </p>
                {product.originalPrice && (
                  <>
                    <p className="text-2xl text-gray-400 line-through">
                      £{product.originalPrice}
                    </p>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                      Save £{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Material & Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: colors.charcoal }}>Material:</span>
                  <span className="text-gray-700">{product.material}</span>
                </div>
                
                {product.features && product.features.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: colors.cream, color: colors.charcoal }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.charcoal }}>
                  Select Size:
                </h4>
                <div className="grid grid-cols-6 gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'text-white scale-105'
                          : 'hover:border-gray-400'
                      }`}
                      style={
                        selectedSize === size
                          ? { backgroundColor: colors.teal, borderColor: colors.teal }
                          : { borderColor: '#d1d5db', color: colors.charcoal }
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.charcoal }}>
                  Available Colors:
                </h4>
                <div className="flex gap-3">
                  {product.color.map((color) => (
                    <div
                      key={color}
                      className="text-center"
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                        style={{
                          backgroundColor: 
                            color === 'Black' ? '#111111' :
                            color === 'Cream' ? '#F5F3EE' :
                            color === 'Grey' ? '#9CA3AF' :
                            color === 'Navy' ? '#1E3A8A' :
                            color === 'Camel' ? '#C19A6B' :
                            color === 'Burgundy' ? '#800020' : '#556B2F'
                        }}
                        title={color}
                      />
                      <p className="text-xs mt-1 text-gray-600">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t mt-6">
              <Link
                to={`/product/${product.id}`}
                className="flex-1 py-4 rounded-xl font-semibold text-center border-2 transition-all hover:scale-105"
                style={{ 
                  borderColor: colors.teal,
                  color: colors.teal
                }}
              >
                View Full Details
              </Link>
              <button 
                className="flex-1 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.teal }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
