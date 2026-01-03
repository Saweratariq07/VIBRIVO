import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, Heart, SlidersHorizontal, X, ChevronDown, 
  ShoppingCart, Eye, Clock, Package, TrendingUp,
  MessageCircle, Share2, Snowflake, Flame, Wind,
  CheckCircle, Filter, Grid, List, ChevronLeft, ChevronRight, ZoomIn
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SidePromoBanners } from './SidePromoBanners';
import { useCurrency } from '../context/CurrencyContext';
import { QuickViewModal } from './QuickViewModal';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
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

export function CollectionPage() {
  const { category } = useParams();
  const { convertPrice } = useCurrency();
  const { addItem, setShowCart } = useCart();
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showBundleSection, setShowBundleSection] = useState(false);
  
  // Filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showOnSale, setShowOnSale] = useState(false);
  const [selectedBundleProducts, setSelectedBundleProducts] = useState<number[]>([]);
  
  // Countdown timer for promotions
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
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

  // Set default sort based on category
  useEffect(() => {
    if (category === 'new') {
      setSortBy('newest');
    } else if (category === 'bestsellers') {
      setSortBy('best-selling');
    } else if (category === 'winter') {
      setSortBy('winter-picks');
    } else if (category === 'lifestyle') {
      setSortBy('best-selling');
    }
  }, [category]);

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Premium Cashmere Sweater',
      price: 189,
      originalPrice: 249,
      rating: 4.9,
      reviews: 1577,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['new', 'bestsellers', 'winter', 'lifestyle'],
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: ['Black', 'Cream', 'Navy'],
      material: 'Cashmere',
      stock: 5,
      isBestSeller: true,
      isNew: true,
      features: ['Warm & Soft', 'Breathable'],
      customerPhotos: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwc2VsZmllJTIwZmFzaGlvbnxlbnwxfHx8fDE3MzQ5MTQ4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    },
    {
      id: 2,
      name: 'Merino Wool Knit',
      price: 159,
      rating: 4.8,
      reviews: 1232,
      image: 'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY2MzU4NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['bestsellers', 'winter', 'lifestyle'],
      size: ['S', 'M', 'L', 'XL'],
      color: ['Grey', 'Black', 'Cream'],
      material: 'Merino Wool',
      stock: 12,
      isBestSeller: true,
      isNew: false,
      features: ['Warm & Soft', 'Moisture-Wicking'],
    },
    {
      id: 3,
      name: 'Essential Turtleneck',
      price: 129,
      originalPrice: 159,
      rating: 4.7,
      reviews: 833,
      image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0d2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzY2NDMwODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['new', 'winter', 'lifestyle'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: ['Black', 'Navy', 'Burgundy'],
      material: 'Cotton Blend',
      stock: 8,
      isBestSeller: false,
      isNew: true,
      features: ['Breathable', 'Lightweight'],
    },
    {
      id: 4,
      name: 'Lifestyle Comfort Cardigan',
      price: 149,
      rating: 4.9,
      reviews: 1122,
      image: 'https://images.unsplash.com/photo-1665168920689-e4dc2ebb7736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWZlc3R5bGUlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjY0MzA4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['bestsellers', 'lifestyle'],
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: ['Cream', 'Grey', 'Camel'],
      material: 'Cashmere Blend',
      stock: 15,
      isBestSeller: true,
      isNew: false,
      features: ['Soft Touch', 'Versatile'],
      customerPhotos: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzdHlsZSUyMHN3ZWF0ZXJ8ZW58MXx8fHwxNzM0OTE0ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    },
    {
      id: 5,
      name: 'Cozy Oversized Hoodie',
      price: 139,
      rating: 4.6,
      reviews: 563,
      image: 'https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY2xvdGhpbmclMjBtaW5pbWFsfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['new', 'lifestyle'],
      size: ['S', 'M', 'L', 'XL'],
      color: ['Black', 'Grey', 'Navy'],
      material: 'Cotton Fleece',
      stock: 20,
      isBestSeller: false,
      isNew: true,
      features: ['Ultra Soft', 'Relaxed Fit'],
    },
    {
      id: 6,
      name: 'Winter Essential Parka',
      price: 279,
      originalPrice: 349,
      rating: 4.9,
      reviews: 1221,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2F0JTIwZmFzaGlvbnxlbnwxfHx8fDE3MzQ5MTQ4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['winter', 'bestsellers'],
      size: ['S', 'M', 'L', 'XL'],
      color: ['Black', 'Navy', 'Olive'],
      material: 'Wool Blend',
      stock: 7,
      isBestSeller: true,
      isNew: false,
      features: ['Windproof', 'Water-Resistant', 'Insulated'],
    },
    {
      id: 7,
      name: 'Luxury Cashmere Scarf',
      price: 79,
      rating: 5.0,
      reviews: 573,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc2NhcmZ8ZW58MXx8fHwxNzM0OTE0ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['winter', 'bestsellers', 'lifestyle'],
      size: ['One Size'],
      color: ['Black', 'Cream', 'Grey', 'Camel'],
      material: 'Cashmere',
      stock: 25,
      isBestSeller: true,
      isNew: false,
      features: ['Warm & Soft', 'Lightweight'],
    },
    {
      id: 8,
      name: 'Minimalist V-Neck Sweater',
      price: 119,
      rating: 4.7,
      reviews: 455,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3MzQ5MTQ4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: ['new', 'lifestyle'],
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: ['Cream', 'Black', 'Camel'],
      material: 'Merino Wool',
      stock: 18,
      isBestSeller: false,
      isNew: true,
      features: ['Breathable', 'Classic Fit'],
    },
  ];

  // Filter products based on category and filters
  const filteredProducts = allProducts
    .filter(product => product.category.includes(category || 'new'))
    .filter(product => selectedSizes.length === 0 || product.size.some(s => selectedSizes.includes(s)))
    .filter(product => selectedColors.length === 0 || product.color.some(c => selectedColors.includes(c)))
    .filter(product => selectedMaterials.length === 0 || selectedMaterials.includes(product.material))
    .filter(product => product.price >= priceRange.min && product.price <= priceRange.max)
    .filter(product => !showOnSale || product.originalPrice)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew ? 1 : -1;
        case 'best-selling':
          return b.reviews - a.reviews;
        case 'winter-picks':
          return (b.features?.includes('Warm & Soft') ? 1 : 0) - (a.features?.includes('Warm & Soft') ? 1 : 0);
        default:
          return 0;
      }
    });

  const categoryInfo = {
    new: {
      title: 'New Arrivals',
      description: 'Discover our latest premium pieces',
      icon: <Flame className="w-6 h-6" />,
    },
    lifestyle: {
      title: 'Lifestyle Collection',
      description: 'Comfort meets modern living',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    bestsellers: {
      title: 'Best Sellers',
      description: 'Our most loved pieces',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    winter: {
      title: 'Winter Essentials',
      description: 'Stay warm in premium comfort',
      icon: <Snowflake className="w-6 h-6" />,
    },
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.new;

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Black', 'Cream', 'Grey', 'Navy', 'Camel', 'Burgundy', 'Olive'];
  const availableMaterials = ['Cashmere', 'Merino Wool', 'Cotton Blend', 'Cashmere Blend', 'Cotton Fleece', 'Wool Blend'];

  const colorHexMap: { [key: string]: string } = {
    Black: '#111111',
    Cream: '#F5F3EE',
    Grey: '#9CA3AF',
    Navy: '#1E3A8A',
    Camel: '#C19A6B',
    Burgundy: '#800020',
    Olive: '#556B2F',
  };

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(f => f !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setPriceRange({ min: 0, max: 500 });
    setShowOnSale(false);
  };

  const activeFiltersCount = selectedSizes.length + selectedColors.length + selectedMaterials.length + (showOnSale ? 1 : 0);

  // Get trending products (top bestsellers)
  const trendingProducts = allProducts
    .filter(p => p.isBestSeller)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 6);

  const toggleBundleProduct = (productId: number) => {
    if (selectedBundleProducts.includes(productId)) {
      setSelectedBundleProducts(selectedBundleProducts.filter(id => id !== productId));
    } else {
      if (selectedBundleProducts.length < 2) {
        setSelectedBundleProducts([...selectedBundleProducts, productId]);
      }
    }
  };

  const bundleTotal = selectedBundleProducts.reduce((sum, id) => {
    const product = allProducts.find(p => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const bundleDiscount = bundleTotal * 0.1;
  const bundleFinalPrice = bundleTotal - bundleDiscount;

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Side Promotional Banners */}
      <SidePromoBanners />
      
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-[#C7A14A] to-[#1ED2AF] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <span>Winter Sale: Up to 30% OFF on Selected Items</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2 text-[#1ED2AF]">
            {currentCategory.icon}
            <h1 className="text-4xl text-[#111111]">{currentCategory.title}</h1>
          </div>
          <p className="text-gray-600">{currentCategory.description}</p>
          <p className="text-sm text-gray-500 mt-2">{filteredProducts.length} products</p>
        </div>

        {/* Top Bar - Sort & View Controls */}
        <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#1ED2AF] transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#1ED2AF] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF]"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                {category === 'winter' && <option value="winter-picks">Best Winter Picks</option>}
              </select>
            </div>

            <div className="flex items-center gap-2 border-l pl-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#1ED2AF] text-white' : 'text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#1ED2AF] text-white' : 'text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sticky Sidebar Filters */}
          {showFilters && (
            <aside className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg p-6 sticky top-24 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#111111]">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* On Sale Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnSale}
                      onChange={(e) => setShowOnSale(e.target.checked)}
                      className="w-5 h-5 accent-[#1ED2AF]"
                    />
                    <span className="text-[#111111]">On Sale</span>
                  </label>
                </div>

                {/* Size Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="mb-3 text-[#111111]">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        className={`py-2 border-2 rounded transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-[#1ED2AF] bg-[#1ED2AF] text-white'
                            : 'border-gray-300 hover:border-[#1ED2AF]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="mb-3 text-[#111111]">Color</h4>
                  <div className="space-y-2">
                    {availableColors.map((color) => (
                      <label key={color} className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedColors.includes(color) ? 'border-[#1ED2AF]' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: colorHexMap[color] }}
                          />
                          {selectedColors.includes(color) && (
                            <CheckCircle className="w-4 h-4 text-[#1ED2AF] absolute -top-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                          className="hidden"
                        />
                        <span className="text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="mb-3 text-[#111111]">Material</h4>
                  <div className="space-y-2">
                    {availableMaterials.map((material) => (
                      <label key={material} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
                          className="w-5 h-5 accent-[#1ED2AF]"
                        />
                        <span className="text-gray-700">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="mb-3 text-[#111111]">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full accent-[#1ED2AF]"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">£{priceRange.min}</span>
                      <span className="text-gray-600">£{priceRange.max}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid/List */}
          <main className="flex-1">
            {/* Bundle Offer Banner */}
            {category === 'bestsellers' && (
              <div className="bg-gradient-to-r from-[#111111] to-[#2A2A2A] text-white rounded-lg p-6 mb-6">
                <h3 className="text-2xl mb-2">Bundle & Save</h3>
                <p className="mb-4">Buy 2 sweaters and get 10% off your entire order</p>
                <button 
                  onClick={() => setShowBundleSection(!showBundleSection)}
                  className="bg-[#1ED2AF] text-white px-6 py-2 rounded-lg hover:bg-[#19b899] transition-colors"
                >
                  {showBundleSection ? 'Hide Bundles' : 'Shop Bundles'}
                </button>
              </div>
            )}

            {/* Bundle Section with Trending Products */}
            {category === 'bestsellers' && showBundleSection && (
              <div className="bg-white rounded-lg p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl mb-2 text-[#111111]">Create Your Bundle</h3>
                    <p className="text-gray-600">Select 2 products to get 10% off</p>
                  </div>
                  <button
                    onClick={() => setShowBundleSection(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Trending Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {trendingProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedBundleProducts.includes(product.id)
                          ? 'border-[#1ED2AF] shadow-lg scale-105'
                          : 'border-gray-200 hover:border-[#C7A14A]'
                      }`}
                      onClick={() => toggleBundleProduct(product.id)}
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        {selectedBundleProducts.includes(product.id) && (
                          <div className="absolute inset-0 bg-[#1ED2AF]/20 flex items-center justify-center">
                            <div className="bg-[#1ED2AF] text-white w-16 h-16 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-10 h-10" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#C7A14A] text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            TRENDING
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="mb-2 text-[#111111]">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-[#C7A14A] text-[#C7A14A]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-xl text-[#111111]">£{product.price}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              £{product.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bundle Summary */}
                {selectedBundleProducts.length > 0 && (
                  <div className="bg-gradient-to-r from-[#F5F3EE] to-white rounded-lg p-6 border-2 border-[#1ED2AF]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl mb-1 text-[#111111]">Your Bundle</h4>
                        <p className="text-sm text-gray-600">
                          {selectedBundleProducts.length} of 2 items selected
                        </p>
                      </div>
                      <div className="text-right">
                        {selectedBundleProducts.length === 2 ? (
                          <>
                            <p className="text-gray-500 line-through text-sm">£{bundleTotal.toFixed(2)}</p>
                            <p className="text-3xl text-[#1ED2AF]">£{bundleFinalPrice.toFixed(2)}</p>
                            <p className="text-sm text-green-700">Save £{bundleDiscount.toFixed(2)} (10%)</p>
                          </>
                        ) : (
                          <p className="text-xl text-gray-600">£{bundleTotal.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    {selectedBundleProducts.length === 2 ? (
                      <button className="w-full bg-[#1ED2AF] text-white py-4 rounded-lg hover:bg-[#19b899] transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                        <ShoppingCart className="w-6 h-6" />
                        Add Bundle to Cart - Save £{bundleDiscount.toFixed(2)}
                      </button>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-yellow-800">
                          {selectedBundleProducts.length === 0
                            ? 'Select 2 products to create your bundle'
                            : 'Select 1 more product to complete your bundle'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Products */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-all ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : ''}`}>
                    <Link to={`/product/${product.id}`}>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                          viewMode === 'list' ? 'h-64' : 'h-80'
                        }`}
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-[#1ED2AF] text-white px-3 py-1 rounded text-xs">
                          NEW
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded text-xs">
                          SALE
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-[#C7A14A] text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          BESTSELLER
                        </span>
                      )}
                    </div>

                    {/* Stock Warning */}
                    {product.stock <= 10 && (
                      <div className="absolute bottom-4 left-4 bg-red-100 text-red-700 px-3 py-1 rounded text-xs flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        Only {product.stock} left!
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-white p-2 rounded-full hover:bg-[#1ED2AF] hover:text-white transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="bg-white p-2 rounded-full hover:bg-[#C7A14A] hover:text-white transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="bg-white p-2 rounded-full hover:bg-[#111111] hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Features Icons */}
                    {product.features && product.features.length > 0 && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {product.features.includes('Warm & Soft') && (
                          <div className="bg-white/90 p-1.5 rounded-full" title="Warm & Soft">
                            <Flame className="w-4 h-4 text-orange-500" />
                          </div>
                        )}
                        {product.features.includes('Breathable') && (
                          <div className="bg-white/90 p-1.5 rounded-full" title="Breathable">
                            <Wind className="w-4 h-4 text-blue-500" />
                          </div>
                        )}
                        {product.features.includes('Windproof') && (
                          <div className="bg-white/90 p-1.5 rounded-full" title="Windproof">
                            <Snowflake className="w-4 h-4 text-blue-700" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="mb-2 text-[#111111] hover:text-[#1ED2AF] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-[#C7A14A] text-[#C7A14A]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Material Badge */}
                      <div className="mb-3">
                        <span className="text-xs bg-[#F5F3EE] text-gray-700 px-2 py-1 rounded">
                          {product.material}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <p className="text-2xl text-[#111111]">£{product.price}</p>
                        {product.originalPrice && (
                          <>
                            <p className="text-lg text-gray-400 line-through">
                              £{product.originalPrice}
                            </p>
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              Save £{product.originalPrice - product.price}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Customer Photos */}
                      {product.customerPhotos && product.customerPhotos.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            Customer photos available
                          </p>
                        </div>
                      )}

                      {/* Suggested Pairing */}
                      {category === 'lifestyle' && product.id === 1 && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-700">
                            💡 Pair this sweater with our Lifestyle Scarf
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        addItem(product);
                        setShowCart(true);
                      }}
                      className="w-full bg-[#1ED2AF] text-white py-3 rounded-lg hover:bg-[#19b899] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl mb-2 text-[#111111]">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#1ED2AF] text-white px-6 py-3 rounded-lg hover:bg-[#19b899] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Live Chat Button */}
        <button className="fixed bottom-6 right-6 bg-[#1ED2AF] text-white p-4 rounded-full shadow-lg hover:bg-[#19b899] transition-all transform hover:scale-110 z-50">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}