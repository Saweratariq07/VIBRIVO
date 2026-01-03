import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, X, ChevronDown, Menu, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { MegaMenu } from './MegaMenu';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 43, seconds: 55 });

  const { currency } = useCurrency();

  // Countdown timer
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Load counts from localStorage and listen for updates
  useEffect(() => {
    const updateCounts = () => {
      const savedCartCount = parseInt(localStorage.getItem('cartCount') || '0');
      const savedWishlistCount = parseInt(localStorage.getItem('wishlistCount') || '0');
      setCartCount(savedCartCount);
      setWishlistCount(savedWishlistCount);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const searchSuggestions = [
    { name: 'Premium Cashmere Sweater', category: 'Sweaters' },
    { name: 'Merino Wool Scarf', category: 'Accessories' },
    { name: 'Essential Turtleneck', category: 'Sweaters' },
    { name: 'Winter Collection', category: 'Collections' },
    { name: 'Lifestyle Items', category: 'Lifestyle' },
  ];

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Navigation dropdowns
  const navigationDropdowns: { [key: string]: Array<{ name: string; link: string; isBold?: boolean }> } = {
    'New Arrivals': [
      { name: "Men's New Arrivals", link: '/collection/mens-new-arrivals', isBold: true },
      { name: "Women's New Arrivals", link: '/collection/womens-new-arrivals', isBold: true },
      { name: 'All New Items', link: '/collection/new-arrivals' },
      { name: 'New Sweaters', link: '/collection/new-sweaters' },
      { name: 'New Accessories', link: '/collection/new-accessories' },
    ],
    'Best Sellers': [
      { name: "Men's Best Sellers", link: '/collection/mens-bestsellers', isBold: true },
      { name: "Women's Best Sellers", link: '/collection/womens-bestsellers', isBold: true },
      { name: 'All Best Sellers', link: '/collection/bestsellers' },
      { name: 'Trending Now', link: '/collection/trending' },
    ],
    'Accessories': [
      { name: 'All Accessories', link: '/collection/accessories', isBold: true },
      { name: 'Bags', link: '/collection/bags' },
      { name: 'Scarves & Gloves', link: '/collection/scarves-gloves' },
      { name: 'Hats & Beanies', link: '/collection/hats-beanies' },
      { name: 'Belts', link: '/collection/belts' },
    ],
  };

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="bg-[#111111] text-white sticky top-0 z-50 shadow-lg will-change-transform">
        {/* Top Banner - Sale Timer */}
        <div className="bg-[#1ED2AF] text-[#111111] py-2.5 px-4">
          <div className="container mx-auto flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm flex-wrap">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold whitespace-nowrap">FREE U.S. SHIPPING $150+</span>
            <span className="hidden sm:inline">|</span>
            <span className="font-semibold whitespace-nowrap">SALE ENDS IN:</span>
            <div className="flex gap-1 items-center">
              <span className="bg-[#111111] text-white px-2 py-1 rounded font-mono text-xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-bold">:</span>
              <span className="bg-[#111111] text-white px-2 py-1 rounded font-mono text-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-bold">:</span>
              <span className="bg-[#111111] text-white px-2 py-1 rounded font-mono text-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="font-bold whitespace-nowrap">UP TO 30% OFF</span>
          </div>
        </div>

        {/* Main navigation bar */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#1ED2AF] transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl tracking-widest font-bold text-white hover:text-[#1ED2AF] transition-colors"
            >
              VIBRIVO
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link 
                to="/" 
                className="text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
              >
                Home
              </Link>

              {/* Shop All - Mega Menu Trigger */}
              <div className="relative dropdown-container">
                <button 
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  className="flex items-center gap-1 text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
                >
                  Shop All
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <Link 
                to="/track-order" 
                className="text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
              >
                Track Your Order
              </Link>

              <Link 
                to="/sustainability" 
                className="text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
              >
                Sustainability
              </Link>

              <Link 
                to="/about" 
                className="text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
              >
                About
              </Link>

              <Link 
                to="/contact" 
                className="text-sm text-white hover:text-[#1ED2AF] transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-[#1ED2AF] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon with Badge */}
              <Link
                to="/wishlist"
                className="text-white hover:text-[#1ED2AF] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1ED2AF] text-[#111111] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                className="text-white hover:text-[#1ED2AF] transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-[#1ED2AF] text-[#111111] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      <div 
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
        className="relative"
      >
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-2xl">
            <div className="flex items-center gap-4 p-6 border-b">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 text-lg outline-none text-[#111111]"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-[#111111]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {filteredSuggestions.length > 0 && (
              <div className="p-4">
                {filteredSuggestions.map((suggestion, idx) => (
                  <Link
                    key={idx}
                    to={`/product/${idx + 1}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="block p-3 hover:bg-[#F5F3EE] rounded-lg transition-colors"
                  >
                    <p className="text-[#111111] font-medium">{suggestion.name}</p>
                    <p className="text-sm text-gray-600">{suggestion.category}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-[#111111] w-[300px] h-full shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <span className="text-xl tracking-widest font-bold text-white">
                VIBRIVO
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#1ED2AF] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-6 space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-white hover:text-[#1ED2AF] hover:bg-[#1a1a1a] transition-colors py-3 px-4 rounded-lg font-medium"
              >
                Home
              </Link>

              <Link 
                to="/track-order" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-white hover:text-[#1ED2AF] hover:bg-[#1a1a1a] transition-colors py-3 px-4 rounded-lg font-medium"
              >
                Track Your Order
              </Link>

              <Link 
                to="/sustainability" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-white hover:text-[#1ED2AF] hover:bg-[#1a1a1a] transition-colors py-3 px-4 rounded-lg font-medium"
              >
                Sustainability
              </Link>

              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-white hover:text-[#1ED2AF] hover:bg-[#1a1a1a] transition-colors py-3 px-4 rounded-lg font-medium"
              >
                About
              </Link>

              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-white hover:text-[#1ED2AF] hover:bg-[#1a1a1a] transition-colors py-3 px-4 rounded-lg font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}