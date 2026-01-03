import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Heart, Truck, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  MapPin, Package, RotateCcw, Shield, Award, Check, X, Clock, Zap, Users, TrendingUp, Gift, Lock, Leaf, Tag, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

export function NikeStyleProductPage() {
  const { addItem, setShowCart } = useCart();
  const { convertPrice } = useCurrency();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 24, seconds: 15 });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Exit Intent Detection
  useEffect(() => {
    let hasShown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowExitIntent(true);
        hasShown = true;
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const product = {
    id: 1,
    name: 'Premium Cashmere Sweater',
    category: "Men's Luxury Knitwear",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviews: 1577,
    stock: 8,
    description: "Unmatched comfort meets timeless style. This premium cashmere sweater features the softest Italian yarn with a modern, relaxed fit. The breathable, temperature-regulating fabric keeps you warm without overheating, while the reinforced seams ensure long-lasting durability. Perfect for layering or wearing solo, this is your go-to piece for effortless sophistication.",
    colors: [
      { 
        name: 'Charcoal Black', 
        hex: '#111111',
        images: [
          'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1490427712608-588e68359dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ]
      },
      { 
        name: 'Warm Cream', 
        hex: '#F5F3EE',
        images: [
          'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ]
      },
      { 
        name: 'Slate Grey', 
        hex: '#708090',
        images: [
          'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ]
      },
      { 
        name: 'Forest Green', 
        hex: '#2d5016',
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ]
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Outer Fabric: 100% Premium Cashmere',
      'Style: IEF103-603',
      'Country/Region of Origin: USA',
    ],
  };

  const sizeChart = [
    { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36', length: '26' },
    { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38', length: '27' },
    { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40', length: '28' },
    { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42', length: '29' },
    { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44', length: '30' },
    { size: 'XXL', chest: '44-46', waist: '38-40', hips: '44-46', length: '31' },
  ];

  const currentColorImages = product.colors[selectedColor].images;

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: currentColorImages[0],
      quantity: quantity,
      size: selectedSize,
      color: product.colors[selectedColor].name,
    });

    setTimeout(() => setShowCart(true), 500);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const customerReviews = [
    {
      name: 'John Doe',
      rating: 5,
      review: "Absolutely love this sweater! It's so soft and comfortable, and the fit is perfect. Highly recommend!",
    },
    {
      name: 'Jane Smith',
      rating: 4.5,
      review: "Great quality and a beautiful color. The cashmere is very soft and the sweater is warm without being bulky.",
    },
    {
      name: 'Sam Johnson',
      rating: 4,
      review: "The sweater is very soft and the fit is good. It's a bit pricey, but worth it for the quality.",
    },
    {
      name: 'Emily Davis',
      rating: 4.5,
      review: "Perfect for layering. The cashmere is very soft and the sweater is warm without being bulky.",
    },
    {
      name: 'Chris Brown',
      rating: 5,
      review: "Absolutely love this sweater! It's so soft and comfortable, and the fit is perfect. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                    Size Guide
                  </h2>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Measurement Instructions */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">How to Measure</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                      <p><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</p>
                      <p><strong>Hips:</strong> Stand with feet together and measure around the fullest part of your hips.</p>
                      <p><strong>Length:</strong> Measure from the highest point of your shoulder to the hem.</p>
                    </div>
                  </div>

                  {/* Size Chart Table */}
                  <div>
                    <h3 className="font-semibold mb-3">Size Chart (inches)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hips</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.map((row, idx) => (
                            <tr 
                              key={row.size}
                              className={`${
                                selectedSize === row.size 
                                  ? 'bg-teal-50 border-2 border-teal-500' 
                                  : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              } hover:bg-gray-100 transition-colors`}
                            >
                              <td className="border border-gray-300 px-4 py-3 font-semibold">
                                {row.size}
                                {selectedSize === row.size && (
                                  <span className="ml-2 text-xs" style={{ color: colors.teal }}>
                                    (Selected)
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-4 py-3">{row.chest}"</td>
                              <td className="border border-gray-300 px-4 py-3">{row.waist}"</td>
                              <td className="border border-gray-300 px-4 py-3">{row.hips}"</td>
                              <td className="border border-gray-300 px-4 py-3">{row.length}"</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Fit Recommendation */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold mb-2 text-blue-900">Fit Recommendation</h3>
                    <p className="text-sm text-blue-800">
                      This sweater has a regular fit. For a more relaxed, oversized look, we recommend sizing up. 
                      If you're between sizes, choose the larger size for comfort.
                    </p>
                  </div>

                  {/* Model Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Model Information</h3>
                    <p className="text-sm text-gray-700">
                      Model is 6'1" (185cm) tall with a 38" chest and wears size <strong>M</strong>
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="w-full py-3 rounded-full font-semibold text-white"
                    style={{ backgroundColor: colors.charcoal }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Details Modal */}
      <AnimatePresence>
        {showProductDetails && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductDetails(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header with Product Info */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start gap-4">
                    {/* Product Thumbnail */}
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={currentColorImages[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h2 className="font-bold" style={{ color: colors.charcoal }}>
                        {product.name}
                      </h2>
                      <div className="mt-1">
                        <span className="font-semibold">MRP: {convertPrice(product.price)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Inclusive of all taxes</p>
                      <p className="text-xs text-gray-500">(Also includes all applicable duties)</p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setShowProductDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Main Description */}
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Softness: exceptional</h3>
                      <p className="text-sm text-gray-700">
                        Made from 100% premium Italian cashmere, providing an ultra-soft hand feel that gets even softer with each wear. The natural fibers create a luxurious texture against your skin.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Warmth: high</h3>
                      <p className="text-sm text-gray-700">
                        Natural temperature-regulating properties keep you warm in cool weather while allowing breathability. The mid-weight knit construction provides optimal insulation without bulk.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Durability: premium</h3>
                      <p className="text-sm text-gray-700">
                        Reinforced seams and expert craftsmanship ensure long-lasting wear. The tight knit structure resists pilling and maintains its shape season after season.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Comfortable fit</h3>
                      <p className="text-sm text-gray-700">
                        Modern relaxed fit with ribbed cuffs and hem for a secure yet comfortable feel. Designed with a slightly longer body length for enhanced coverage and style versatility.
                      </p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-lg mb-3">Product details</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Colour Shown: {product.colors[selectedColor].name}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Style: {product.features[1]}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{product.features[2]}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Material: {product.features[0]}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Care: Dry clean only, do not tumble dry, iron on low heat</span>
                      </li>
                    </ul>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowProductDetails(false)}
                    className="w-full py-3 rounded-full font-semibold text-white"
                    style={{ backgroundColor: colors.charcoal }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitIntent(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                    Don't Miss Out!
                  </h2>
                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Countdown Timer */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Limited Time Offer</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Get this premium cashmere sweater at a discounted price for a limited time only!</p>
                      <p className="text-xl font-bold">Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Product Information</h3>
                    <p className="text-sm text-gray-700">
                      {product.name} - {product.category}
                    </p>
                    <p className="text-sm text-gray-700">
                      MRP: {convertPrice(product.price)}
                    </p>
                    <p className="text-sm text-gray-700">
                      Inclusive of all taxes
                    </p>
                    <p className="text-sm text-gray-700">
                      (Also includes all applicable duties)
                    </p>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToBag}
                      className="w-full py-4 rounded-full font-semibold text-white text-lg transition-all"
                      style={{ backgroundColor: colors.charcoal }}
                    >
                      Add to Bag
                    </motion.button>

                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="w-full py-4 rounded-full font-semibold border-2 transition-all flex items-center justify-center gap-2"
                      style={{ 
                        borderColor: colors.charcoal,
                        color: colors.charcoal 
                      }}
                    >
                      <Heart 
                        className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} 
                      />
                      Favourite
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="w-full py-3 rounded-full font-semibold text-white"
                    style={{ backgroundColor: colors.charcoal }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Thumbnail Gallery */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {currentColorImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${
                    mainImage === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CENTER: Main Product Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="sticky top-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mainImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={currentColorImages[mainImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {currentColorImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setMainImage(prev => (prev > 0 ? prev - 1 : currentColorImages.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setMainImage(prev => (prev < currentColorImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="lg:col-span-5 order-3">
            <div className="space-y-6">
              
              {/* Bundle Discount Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 rounded-lg p-4"
                style={{ borderColor: colors.gold }}
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6" style={{ color: colors.gold }} />
                  <div className="flex-1">
                    <p className="font-bold text-sm">Bundle & Save!</p>
                    <p className="text-xs text-gray-700">Buy 2 items, get 10% OFF - <strong>Save ${convertPrice(38)}</strong></p>
                  </div>
                  <TrendingUp className="w-5 h-5" style={{ color: colors.gold }} />
                </div>
              </motion.div>

              {/* Product Title & Category */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: colors.charcoal }}>
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.category}</p>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xl font-semibold">MRP: {convertPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-base line-through text-gray-400">
                      {convertPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                {product.originalPrice && (
                  <p className="text-sm mt-1" style={{ color: colors.teal }}>
                    (Also includes all applicable duties)
                  </p>
                )}
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Select Colour</h3>
                  <span className="text-sm text-gray-600">{product.colors[selectedColor].name}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(idx);
                        setMainImage(0);
                      }}
                      className={`w-14 h-14 rounded border-2 overflow-hidden transition-all ${
                        selectedColor === idx ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-500'
                      }`}
                      title={color.name}
                    >
                      <ImageWithFallback
                        src={color.images[0]}
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Select Size</h3>
                  <button 
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Size Guide
                  </button>
                </div>
                
                {/* Size Recommendation */}
                <p className="text-sm text-gray-600 mb-3">
                  For a snug fit, we recommend ordering a size up.
                </p>

                {/* Size Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Stock Warning */}
                {product.stock <= 10 && (
                  <p className="text-sm text-red-600 mt-2">
                    ⚠️ Only {product.stock} left in stock!
                  </p>
                )}
              </div>

              {/* Add to Bag Button */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToBag}
                  className="w-full py-4 rounded-full font-semibold text-white text-lg transition-all"
                  style={{ backgroundColor: colors.charcoal }}
                >
                  Add to Bag
                </motion.button>

                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="w-full py-4 rounded-full font-semibold border-2 transition-all flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: colors.charcoal,
                    color: colors.charcoal 
                  }}
                >
                  <Heart 
                    className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} 
                  />
                  Favourite
                </button>
              </div>

              {/* Trust Badges - Premium 8-Icon Layout */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm"
              >
                <h3 className="font-semibold text-center mb-4" style={{ color: colors.charcoal }}>
                  Why Shop With Us
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Fast & Free Shipping */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.teal + '20' }}
                    >
                      <Truck className="w-5 h-5" style={{ color: colors.teal }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: colors.charcoal }}>
                        Fast & Free Shipping
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">Delivered in 3-5 days</p>
                    </div>
                  </div>

                  {/* Eco-Friendly */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#22c55e20' }}
                    >
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: colors.charcoal }}>
                        Eco-Friendly Packaging
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">Sustainable materials</p>
                    </div>
                  </div>

                  {/* Secure Payment */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.gold + '20' }}
                    >
                      <Lock className="w-5 h-5" style={{ color: colors.gold }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: colors.charcoal }}>
                        Secure Payment
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">SSL Encrypted</p>
                    </div>
                  </div>

                  {/* Price Match Guarantee */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.gold + '20' }}
                    >
                      <Tag className="w-5 h-5" style={{ color: colors.gold }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: colors.charcoal }}>
                        Price Match Guarantee
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">Best price promise</p>
                    </div>
                  </div>

                  {/* 24/7 Customer Support */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.teal + '20' }}
                    >
                      <Headphones className="w-5 h-5" style={{ color: colors.teal }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: colors.charcoal }}>
                        24/7 Customer Support
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">Always here to help</p>
                    </div>
                  </div>
                </div>

                {/* Bonus Badges Section */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  {/* Free Gift Banner */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 h-6 text-purple-600" />
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: colors.charcoal }}>
                          Free Gift with Orders Over {convertPrice(100)}
                        </p>
                        <p className="text-xs text-gray-700">Limited time offer - add more to qualify!</p>
                      </div>
                    </div>
                  </div>

                  {/* Authenticity Guarantee */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: colors.charcoal }}>
                          Authentic & Genuine Products
                        </p>
                        <p className="text-xs text-gray-700">100% verified - no counterfeits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Product Description */}
              <div className="pt-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              <div>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Product Details Link */}
              <button 
                onClick={() => setShowProductDetails(true)}
                className="inline-block text-sm underline hover:no-underline"
              >
                View Product Details
              </button>

              {/* Collapsible Sections */}
              <div className="border-t border-gray-200 pt-6 space-y-0">
                
                {/* Size & Fit */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('size-fit')}
                    className="w-full py-4 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <span>Size & Fit</span>
                    {expandedSection === 'size-fit' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'size-fit' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-gray-700 space-y-2">
                          <p>• Model is 6'1" and wears size M</p>
                          <p>• Regular fit - true to size</p>
                          <p>• Mid-weight knit fabric</p>
                          <p>• Length: 28" (size M)</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delivery & Returns */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('delivery')}
                    className="w-full py-4 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <span>Delivery & Returns</span>
                    {expandedSection === 'delivery' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'delivery' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-gray-700 space-y-3">
                          <div className="flex items-start gap-2">
                            <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                            <div>
                              <p className="font-semibold">Free Standard Delivery</p>
                              <p>Delivered in 3-5 business days</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Leaf className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                            <div>
                              <p className="font-semibold">Eco-Friendly Packaging</p>
                              <p>Sustainable and recyclable materials</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                            <div>
                              <p className="font-semibold">Enter Delivery Postcode</p>
                              <input 
                                type="text" 
                                placeholder="e.g. SW1A 1AA"
                                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2"
                                style={{ focusRingColor: colors.teal }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reviews */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('reviews')}
                    className="w-full py-4 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <span>Reviews ({product.reviews})</span>
                    {expandedSection === 'reviews' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'reviews' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-gray-700 space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4"
                                  fill={i < Math.floor(product.rating) ? colors.gold : 'none'}
                                  style={{ color: colors.gold }}
                                />
                              ))}
                            </div>
                            <span className="font-semibold">{product.rating} out of 5</span>
                          </div>
                          <p>{product.reviews} verified reviews</p>
                          <Link 
                            to="/reviews" 
                            className="inline-block underline hover:no-underline"
                          >
                            Read all reviews
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Information */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('product-info')}
                    className="w-full py-4 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <span>Product Information</span>
                    {expandedSection === 'product-info' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'product-info' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-gray-700 space-y-2">
                          <div className="flex items-start gap-2">
                            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                            <div>
                              <p className="font-semibold">100% Authentic</p>
                              <p>Guaranteed genuine VIBRIVO product</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                            <div>
                              <p className="font-semibold">Premium Quality</p>
                              <p>Ethically sourced materials</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="font-semibold mb-1">Care Instructions:</p>
                            <p>• Dry clean only</p>
                            <p>• Do not tumble dry</p>
                            <p>• Iron on low heat</p>
                            <p>• Store folded, not hung</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Link key={item} to={`/product/${item}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${1760140175771 + item}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600`}
                    alt={`Related product ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold mb-1">Premium Knit Sweater</h3>
                <p className="text-sm text-gray-600 mb-1">Casual Wear</p>
                <p className="font-semibold">{convertPrice(159)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}