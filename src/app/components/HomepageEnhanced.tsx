import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Heart, ChevronRight, ChevronLeft, ChevronDown, Leaf, Recycle, Award, Truck, 
  ShieldCheck, Gift, Clock, TrendingUp, X, MapPin, Play, Ruler, 
  Users, CheckCircle, Facebook, Instagram, Twitter, Youtube, 
  Share2, Eye, ShoppingBag, Lock, CreditCard, RotateCcw, Package,
  ArrowRight, Sparkles, PlayCircle, Quote, Check
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCurrency } from '../context/CurrencyContext';
import { ProductGrid } from './ProductGrid';
import { NewsletterCTA } from './NewsletterCTA';
import { CollectionsCarousel } from './CollectionsCarousel';
import { FeaturedProductWeek } from './FeaturedProductWeek';
import { CustomerReviews } from './CustomerReviews';
import { ExitIntentPopup } from './ExitIntentPopup';

// VIBRIVO Brand Colors
const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

export function HomepageEnhanced() {
  const { convertPrice } = useCurrency();
  
  // State Management
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 12, minutes: 30, seconds: 45 });
  const [email, setEmail] = useState('');
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentBestSeller, setCurrentBestSeller] = useState(0);
  const [currentShopLook, setCurrentShopLook] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Fit Finder State
  const [fitFinderData, setFitFinderData] = useState({ 
    height: '', 
    weight: '', 
    bodyType: 'regular',
    preferredFit: 'regular' 
  });
  const [recommendedSize, setRecommendedSize] = useState('');
  const [showFitFinder, setShowFitFinder] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Limited Edition Countdown
 useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev.seconds > 0) {
        return { ...prev, seconds: prev.seconds - 1 };

      } else if (prev.minutes > 0) {
        return { ...prev, minutes: prev.minutes - 1, seconds: 59 };

      } else if (prev.hours > 0) {
        return { 
          ...prev,
          hours: prev.hours - 1,
          minutes: 59,
          seconds: 59
        };

      } else if (prev.days > 0) {
        return {
          days: prev.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59
        };

      } else {
        return {
          days: 7,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);


  // Exit Intent Popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Cashmere Sweater',
      price: 189,
      originalPrice: 249,
      rating: 4.9,
      reviews: 1577,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      badge: 'Best Seller',
      stock: 8,
      stockPercent: 16,
      reviewSnippet: "Incredibly soft and luxurious!"
    },
    {
      id: 2,
      name: 'Merino Wool Knit',
      price: 159,
      originalPrice: 199,
      rating: 4.8,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY2MzU4NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      badge: 'New Arrival',
      stock: 15,
      stockPercent: 30,
      reviewSnippet: "Perfect fit and amazing quality!"
    },
    {
      id: 3,
      name: 'Essential Turtleneck',
      price: 129,
      originalPrice: 159,
      rating: 4.7,
      reviews: 654,
      image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0d2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzY2NDMwODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1490427712608-588e68359dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      badge: 'Limited Edition',
      stock: 3,
      stockPercent: 6,
      reviewSnippet: "Stylish and comfortable!"
    },
    {
      id: 4,
      name: 'Lifestyle Comfort Blend',
      price: 149,
      originalPrice: 189,
      rating: 4.8,
      reviews: 1243,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG1vZGVsfGVufDF8fHx8MTczNjIzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'Best Seller',
      stock: 12,
      stockPercent: 24
    },
    {
      id: 5,
      name: 'Winter Heritage Sweater',
      price: 199,
      originalPrice: 259,
      rating: 4.9,
      reviews: 856,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'Limited Edition',
      stock: 5,
      stockPercent: 10
    },
    {
      id: 6,
      name: 'Sustainable Cotton Knit',
      price: 119,
      originalPrice: 149,
      rating: 4.6,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nfGVufDF8fHx8MTczNjIzNzE2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'Eco-Friendly',
      stock: 20,
      stockPercent: 40
    }
  ];

  // Best Sellers
  const bestSellers = [
    {
      id: 1,
      name: 'Premium Cashmere Sweater',
      price: 189,
      rating: 4.9,
      reviews: 1577,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      sold: 2847
    },
    {
      id: 2,
      name: 'Lifestyle Comfort Blend',
      price: 149,
      rating: 4.8,
      reviews: 1243,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG1vZGVsfGVufDF8fHx8MTczNjIzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      sold: 1965
    },
    {
      id: 3,
      name: 'Merino Wool Knit',
      price: 159,
      rating: 4.8,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY2MzU4NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sold: 1523
    },
    {
      id: 4,
      name: 'Winter Heritage Sweater',
      price: 199,
      rating: 4.9,
      reviews: 856,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sold: 1287
    }
  ];

  // New Arrivals
  const newArrivals = [
    {
      id: 7,
      name: 'Modern Cardigan',
      price: 139,
      originalPrice: 169,
      rating: 4.7,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaWdhbiUyMGZhc2hpb258ZW58MXx8fHwxNzM2MjM3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'New'
    },
    {
      id: 8,
      name: 'Chunky Knit Pullover',
      price: 169,
      rating: 4.6,
      reviews: 418,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVua3klMjBrbml0fGVufDF8fHx8MTczNjIzNzI1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'New'
    },
    {
      id: 9,
      name: 'Lightweight Summer Sweater',
      price: 99,
      originalPrice: 129,
      rating: 4.5,
      reviews: 356,
      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzd2VhdGVyfGVufDF8fHx8MTczNjIzNzI4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'New'
    },
    {
      id: 10,
      name: 'Oversized Comfort Hoodie',
      price: 129,
      rating: 4.8,
      reviews: 587,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBob29kaWV8ZW58MXx8fHwxNzM2MjM3MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'New'
    }
  ];

  // Categories
  const categories = [
    {
      id: 1,
      name: 'Sweaters',
      count: 48,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: '🧶'
    },
    {
      id: 2,
      name: 'Clothing',
      count: 126,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG1vZGVsfGVufDF8fHx8MTczNjIzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: '👔'
    },
    {
      id: 3,
      name: 'Bags',
      count: 32,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWd8ZW58MXx8fHwxNzM2MjM3MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: '👜'
    },
    {
      id: 4,
      name: 'Lifestyle Wear',
      count: 64,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBob29kaWV8ZW58MXx8fHwxNzM2MjM3MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: '✨'
    }
  ];

  // Eco-Friendly Collection
  const ecoProducts = [
    {
      id: 11,
      name: 'Organic Cotton Sweater',
      price: 119,
      rating: 4.7,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nfGVufDF8fHx8MTczNjIzNzE2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      eco: 'Made from 100% organic cotton'
    },
    {
      id: 12,
      name: 'Recycled Wool Blend',
      price: 139,
      rating: 4.8,
      reviews: 578,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVua3klMjBrbml0fGVufDF8fHx8MTczNjIzNzI1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      eco: 'Crafted from recycled materials'
    },
    {
      id: 13,
      name: 'Bamboo Fiber Knit',
      price: 109,
      rating: 4.6,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzd2VhdGVyfGVufDF8fHx8MTczNjIzNzI4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      eco: 'Sustainable bamboo fibers'
    }
  ];

  // All Products for Shop All Products Section
  const allProducts = [
    {
      id: 'prod-1',
      name: 'Premium Cashmere Sweater',
      price: 206,
      originalPrice: 271,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.9,
      reviewCount: 1577,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 24,
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-2',
      name: 'Merino Wool Knit',
      price: 173,
      originalPrice: 217,
      image: 'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY2MzU4NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.8,
      reviewCount: 892,
      badge: { text: 'New Arrival', type: 'new' as const },
      discount: 20,
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-3',
      name: 'Essential Turtleneck',
      price: 141,
      originalPrice: 173,
      image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0d2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzY2NDMwODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1490427712608-588e68359dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.7,
      reviewCount: 654,
      badge: { text: 'Only 3 Left', type: 'limited' as const },
      discount: 19,
      category: 'sweaters',
      inStock: true,
      stockCount: 3,
    },
    {
      id: 'prod-4',
      name: 'Lifestyle Comfort Blend',
      price: 162,
      originalPrice: 206,
      image: 'https://images.unsplash.com/photo-1665168920689-e4dc2ebb7736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWZlc3R5bGUlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjY0MzA4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.8,
      reviewCount: 1243,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 21,
      category: 'lifestyle',
      inStock: true,
    },
    {
      id: 'prod-5',
      name: 'Winter Heritage Sweater',
      price: 217,
      originalPrice: 282,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.9,
      reviewCount: 856,
      badge: { text: 'Only 5 Left', type: 'limited' as const },
      discount: 23,
      category: 'sweaters',
      inStock: true,
      stockCount: 5,
    },
    {
      id: 'prod-6',
      name: 'Sustainable Cotton Knit',
      price: 130,
      originalPrice: 162,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nfGVufDF8fHx8MTczNjIzNzE2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.6,
      reviewCount: 432,
      discount: 20,
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-7',
      name: 'Modern Cardigan',
      price: 152,
      originalPrice: 184,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaWdhbiUyMGZhc2hpb258ZW58MXx8fHwxNzM2MjM3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.7,
      reviewCount: 324,
      badge: { text: 'New Arrival', type: 'new' as const },
      discount: 18,
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-8',
      name: 'Chunky Knit Pullover',
      price: 184,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVua3klMjBrbml0fGVufDF8fHx8MTczNjIzNzI1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.6,
      reviewCount: 418,
      badge: { text: 'New Arrival', type: 'new' as const },
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-9',
      name: 'Lightweight Summer Sweater',
      price: 108,
      originalPrice: 141,
      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzd2VhdGVyfGVufDF8fHx8MTczNjIzNzI4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.5,
      reviewCount: 356,
      discount: 23,
      category: 'sweaters',
      inStock: true,
    },
    {
      id: 'prod-10',
      name: 'Silk-Blend Scarf',
      price: 86,
      originalPrice: 108,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc2NhcmZ8ZW58MXx8fHwxNzM0OTE0ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.8,
      reviewCount: 567,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 20,
      category: 'accessories',
      inStock: true,
    },
    {
      id: 'prod-11',
      name: 'Leather Crossbody Bag',
      price: 217,
      originalPrice: 282,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWd8ZW58MXx8fHwxNzM2MjM3MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.9,
      reviewCount: 892,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 23,
      category: 'accessories',
      inStock: true,
    },
    {
      id: 'prod-12',
      name: 'Minimalist Watch',
      price: 162,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2F0Y2h8ZW58MXx8fHwxNzM2MjM3NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.7,
      reviewCount: 423,
      category: 'accessories',
      inStock: true,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Jessica Martinez',
      location: 'New York, NY',
      rating: 5,
      text: 'The quality is absolutely exceptional! I\'ve purchased three sweaters now and each one is better than the last. The cashmere is incredibly soft and the fit is perfect.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczNjIzNzQyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'VIBRIVO has become my go-to brand for premium knitwear. The attention to detail and sustainable practices make me feel good about every purchase.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzYyMzc0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true
    },
    {
      id: 3,
      name: 'Sophie Anderson',
      location: 'Miami, FL',
      rating: 5,
      text: 'I was skeptical about ordering online, but the fit finder tool was spot on! My sweater fits like it was made for me. Customer service is also outstanding.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTczNjIzNzQyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true
    },
    {
      id: 4,
      name: 'Alex Thompson',
      location: 'Seattle, WA',
      rating: 5,
      text: 'The Winter Heritage Collection is absolutely stunning. Worth every penny. The limited edition aspect makes it even more special.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzYyMzc0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true
    }
  ];

  // Shop the Look Outfits
  const shopTheLook = [
    {
      id: 1,
      name: 'Winter Sophisticate',
      items: 3,
      totalPrice: 457,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      products: ['Premium Cashmere Sweater', 'Wool Trousers', 'Leather Bag']
    },
    {
      id: 2,
      name: 'Casual Comfort',
      items: 3,
      totalPrice: 347,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG1vZGVsfGVufDF8fHx8MTczNjIzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      products: ['Lifestyle Comfort Blend', 'Jeans', 'Canvas Tote']
    },
    {
      id: 3,
      name: 'Heritage Classic',
      items: 4,
      totalPrice: 628,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      products: ['Winter Heritage Sweater', 'Chinos', 'Leather Boots', 'Scarf']
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all unworn items with original tags attached. Simply contact our customer service team to initiate a return, and we\'ll provide you with a prepaid shipping label. Refunds are processed within 5-7 business days of receiving your return.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days within the continental US. Express shipping (1-2 business days) is also available. International shipping times vary by location but typically take 7-14 business days. Free shipping is available on orders over $100.'
    },
    {
      question: 'What materials are your sweaters made from?',
      answer: 'Our sweaters are crafted from premium materials including 100% merino wool, cashmere blends, organic cotton, and sustainable bamboo fibers. Each product page includes detailed material composition and care instructions to help you make an informed choice.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes! We ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. All duties and taxes are calculated at checkout, so there are no surprise fees upon delivery.'
    },
    {
      question: 'How do I know which size to order?',
      answer: 'We provide detailed size charts on each product page with measurements in both inches and centimeters. Our Fit Finder tool can also help recommend the perfect size based on your height, weight, and fit preferences. If you\'re between sizes, we recommend sizing up for a more relaxed fit.'
    },
    {
      question: 'Are your products sustainably made?',
      answer: 'Sustainability is at the core of VIBRIVO. We use eco-friendly materials, partner with ethical manufacturers, and minimize waste throughout our production process. Many of our sweaters are made from organic or recycled materials, and we\'re constantly working to reduce our environmental impact.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order status anytime by logging into your account and visiting the "My Orders" section. Our customer service team is available 24/7 if you need additional assistance.'
    }
  ];

  // Product Spotlight (Featured Product of the Week)
  const spotlightProduct = {
    id: 5,
    name: 'Winter Heritage Sweater',
    price: 199,
    originalPrice: 259,
    rating: 4.9,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hand-crafted from premium merino wool, this limited edition piece combines traditional craftsmanship with modern design.',
    totalStock: 500,
    soldStock: 450,
    features: ['Premium Merino Wool', 'Hand-Crafted', 'Limited to 500 Pieces', 'Sustainable Production']
  };

  // All Products for ProductGrid
  const allProductsForGrid = [
    {
      id: 'prod-1',
      name: 'Premium Cashmere Sweater',
      price: 189,
      originalPrice: 249,
      image: 'https://images.unsplash.com/photo-1760140175771-9d988079e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NjQzMDg4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.9,
      reviewCount: 1577,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 24,
      category: 'sweaters',
      inStock: true,
      stockCount: 8
    },
    {
      id: 'prod-2',
      name: 'Merino Wool Knit',
      price: 159,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1765337210176-1bb643f4776b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY2MzU4NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.8,
      reviewCount: 892,
      badge: { text: 'New Arrival', type: 'new' as const },
      discount: 20,
      category: 'sweaters',
      inStock: true
    },
    {
      id: 'prod-3',
      name: 'Essential Turtleneck',
      price: 129,
      originalPrice: 159,
      image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0d2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzY2NDMwODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1490427712608-588e68359dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.7,
      reviewCount: 654,
      badge: { text: 'Limited Stock', type: 'limited' as const },
      discount: 19,
      category: 'sweaters',
      inStock: true,
      stockCount: 3
    },
    {
      id: 'prod-4',
      name: 'Lifestyle Comfort Blend',
      price: 149,
      originalPrice: 189,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG1vZGVsfGVufDF8fHx8MTczNjIzNzA0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 1243,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      discount: 21,
      category: 'lifestyle',
      inStock: true
    },
    {
      id: 'prod-5',
      name: 'Winter Heritage Sweater',
      price: 199,
      originalPrice: 259,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrbml0JTIwc3dlYXRlcnxlbnwxfHx8fDE3MzYyMzcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 856,
      badge: { text: 'Limited Stock', type: 'limited' as const },
      discount: 23,
      category: 'sweaters',
      inStock: true,
      stockCount: 5
    },
    {
      id: 'prod-6',
      name: 'Sustainable Cotton Knit',
      price: 119,
      originalPrice: 149,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nfGVufDF8fHx8MTczNjIzNzE2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 432,
      category: 'sweaters',
      inStock: true,
      discount: 20
    },
    {
      id: 'prod-7',
      name: 'Modern Cardigan',
      price: 139,
      originalPrice: 169,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaWdhbiUyMGZhc2hpb258ZW58MXx8fHwxNzM2MjM3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 324,
      badge: { text: 'New Arrival', type: 'new' as const },
      category: 'sweaters',
      inStock: true,
      discount: 18
    },
    {
      id: 'prod-8',
      name: 'Chunky Knit Pullover',
      price: 169,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVua3klMjBrbml0fGVufDF8fHx8MTczNjIzNzI1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 418,
      badge: { text: 'New Arrival', type: 'new' as const },
      category: 'sweaters',
      inStock: true
    },
    {
      id: 'prod-9',
      name: 'Lightweight Summer Sweater',
      price: 99,
      originalPrice: 129,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.5,
      reviewCount: 356,
      category: 'sweaters',
      inStock: true,
      discount: 23
    },
    {
      id: 'prod-10',
      name: 'Silk-Blend Scarf',
      price: 79,
      originalPrice: 99,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.8,
      reviewCount: 567,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      category: 'accessories',
      inStock: true,
      discount: 20
    },
    {
      id: 'prod-11',
      name: 'Leather Crossbody Bag',
      price: 199,
      originalPrice: 259,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.9,
      reviewCount: 892,
      badge: { text: 'Best Seller', type: 'bestseller' as const },
      category: 'accessories',
      inStock: true,
      discount: 23
    },
    {
      id: 'prod-12',
      name: 'Minimalist Watch',
      price: 149,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      rating: 4.7,
      reviewCount: 423,
      category: 'accessories',
      inStock: true
    }
  ];

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const calculateRecommendedSize = () => {
    const height = parseInt(fitFinderData.height);
    const weight = parseInt(fitFinderData.weight);
    const { bodyType, preferredFit } = fitFinderData;
    
    if (!height || !weight) {
      return 'Please enter valid measurements';
    }

    // BMI-based calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let baseSize = '';
    
    // Height-based sizing
    if (height < 160) {
      baseSize = 'XS';
    } else if (height < 170) {
      baseSize = 'S';
    } else if (height < 178) {
      baseSize = 'M';
    } else if (height < 186) {
      baseSize = 'L';
    } else {
      baseSize = 'XL';
    }
    
    // Adjust for BMI
    if (bmi > 28) {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex < sizes.length - 1) {
        baseSize = sizes[currentIndex + 1];
      }
    } else if (bmi < 18) {
      const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex > 0) {
        baseSize = sizes[currentIndex - 1];
      }
    }
    
    // Adjust for preferred fit
    if (preferredFit === 'slim') {
      const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex > 0) {
        baseSize = sizes[currentIndex - 1];
      }
    } else if (preferredFit === 'oversized') {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(baseSize);
      if (currentIndex < sizes.length - 1) {
        baseSize = sizes[currentIndex + 1];
      }
    }
    
    setRecommendedSize(baseSize);
  };

  const handleFitFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRecommendedSize();
  };

  return (
    <div className="w-full" style={{ backgroundColor: colors.cream }}>
      {/* Hero Section with Elegant Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0" 
                 style={{ 
                   backgroundImage: 'url(https://images.unsplash.com/photo-1678534960208-1048c4d778f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY2FzaG1lcmUlMjBzd2VhdGVyJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc2NzM4MTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
          </div>
        </div>

        {/* Hero Content - Centered */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex items-center justify-center h-full text-center px-4 pb-48"
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Large Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
                HANDMADE CASHMERE<br />
                SWEATERS CRAFTED<br />
                FOR EVERY SEASON
              </h1>
              
              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
                Eco-friendly, artisan-crafted sweaters that blend sustainability with timeless design, making every outfit memorable and elegant.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/collection" 
                    className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-full transition-all bg-white text-[#111111] hover:bg-gray-100 shadow-lg"
                  >
                    Shop Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-full border-2 border-white text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Popular Products Section - Overlaid at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20"
            >
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Left Side - Heading */}
                <div className="lg:w-1/4 text-left lg:border-r border-white/20 lg:pr-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    Popular<br />Products
                  </h2>
                  <p className="text-gray-400 text-xs md:text-sm">Popular Products 2025</p>
                </div>

                {/* Right Side - Product Cards */}
                <div className="lg:w-3/4 w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {/* Product Card 1 - Cashmere Sweater */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Link to="/product/cashmere-sweater" className="block">
                        <div className="bg-[#F5F3EE] rounded-xl md:rounded-2xl p-3 md:p-4 aspect-square relative overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1631541909061-71e349d1f203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY2FzaG1lcmUlMjBzd2VhdGVyfGVufDF8fHx8MTc2NzM0NjU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Cashmere Sweater"
                            className="w-full h-full object-cover rounded-lg md:rounded-xl"
                          />
                          {/* Vertical Text Label */}
                          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
                            <span className="text-[10px] md:text-xs font-semibold text-gray-800 whitespace-nowrap transform rotate-90 origin-center">
                              CASHMERE
                            </span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Product Card 2 - Turtleneck */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Link to="/product/turtleneck" className="block">
                        <div className="bg-[#F5F3EE] rounded-xl md:rounded-2xl p-3 md:p-4 aspect-square relative overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1608739871816-346c9db7e122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJ0bGVuZWNrJTIwc3dlYXRlciUyMGZhc2hpb258ZW58MXx8fHwxNzY3MzgxMzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Turtleneck"
                            className="w-full h-full object-cover rounded-lg md:rounded-xl"
                          />
                          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
                            <span className="text-[10px] md:text-xs font-semibold text-gray-800 whitespace-nowrap transform rotate-90 origin-center">
                              TURTLENECK
                            </span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Product Card 3 - Wool Knit */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Link to="/product/wool-knit" className="block">
                        <div className="bg-[#F5F3EE] rounded-xl md:rounded-2xl p-3 md:p-4 aspect-square relative overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1711097258176-c1a4bb511aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwa25pdCUyMHN3ZWF0ZXJ8ZW58MXx8fHwxNzY3MzgxMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Wool Knit"
                            className="w-full h-full object-cover rounded-lg md:rounded-xl"
                          />
                          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
                            <span className="text-[10px] md:text-xs font-semibold text-gray-800 whitespace-nowrap transform rotate-90 origin-center">
                              WOOL KNIT
                            </span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Product Card 4 - Cardigan */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Link to="/product/cardigan" className="block">
                        <div className="bg-[#F5F3EE] rounded-xl md:rounded-2xl p-3 md:p-4 aspect-square relative overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1552738352-a077028e482c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaWdhbiUyMHN3ZWF0ZXIlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzY3MzgxMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Cardigan Set"
                            className="w-full h-full object-cover rounded-lg md:rounded-xl"
                          />
                          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
                            <span className="text-[10px] md:text-xs font-semibold text-gray-800 whitespace-nowrap transform rotate-90 origin-center">
                              CARDIGAN
                            </span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Popular Categories */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          {/* Header with View All Button */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.charcoal }}>
              Shop Popular Categories
            </h2>
            <Link 
              to="/collection" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: colors.teal, color: 'white' }}
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* New Arrivals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link to="/collection/new">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1686704814231-ef0474eea7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dlYXRlciUyMG5ldyUyMGFycml2YWxzfGVufDF8fHx8MTc2NzM4MTcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="New Arrivals"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.charcoal }}>
                  New Arrivals
                </h3>
              </Link>
            </motion.div>

            {/* Accessories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link to="/collection/accessories">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1767204658690-6e7a9485f3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBzY2FyZiUyMGJhZ3xlbnwxfHx8fDE3NjczODE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Accessories"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.charcoal }}>
                  Accessories
                </h3>
              </Link>
            </motion.div>

            {/* Winter Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link to="/collection/winter">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1767020990482-4cbdf3e7bdeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzd2VhdGVyJTIwc3R5bGV8ZW58MXx8fHwxNzY3MzgxNzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Winter Collection"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.charcoal }}>
                  Winter Collection
                </h3>
              </Link>
            </motion.div>

            {/* Outerwear */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link to="/collection/outerwear">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1611025504703-8c143abe6996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRlcndlYXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2NzM4MTcxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Outerwear"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: colors.charcoal }}>
                  Outerwear
                </h3>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Eco-Friendly Packaging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Leaf className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: colors.charcoal }}>
                Eco-Friendly Packaging
              </h3>
              <p className="text-sm text-gray-600">
                Sustainable materials
              </p>
            </motion.div>

            {/* Fast & Free Shipping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Truck className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: colors.charcoal }}>
                Fast & Free Shipping
              </h3>
              <p className="text-sm text-gray-600">
                On all orders
              </p>
            </motion.div>

            {/* Secure Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Lock className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: colors.charcoal }}>
                Secure Payment
              </h3>
              <p className="text-sm text-gray-600">
                SSL encrypted
              </p>
            </motion.div>

            {/* Premium Quality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Award className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: colors.charcoal }}>
                Premium Quality
              </h3>
              <p className="text-sm text-gray-600">
                Satisfaction guaranteed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Discover Our Most-Loved Premium Pieces
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites that define comfort and style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  {/* Product Image - LARGER with Alternate View on Hover */}
                  <div 
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{ backgroundColor: colors.cream }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Main Image */}
                    <motion.div
                      animate={{ 
                        scale: hoveredProduct === product.id ? 1.15 : 1,
                        rotate: hoveredProduct === product.id ? 2 : 0,
                        opacity: hoveredProduct === product.id && product.hoverImage ? 0 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Alternate Image on Hover */}
                    {product.hoverImage && (
                      <motion.div
                        animate={{ 
                          scale: hoveredProduct === product.id ? 1.15 : 1,
                          rotate: hoveredProduct === product.id ? 2 : 0,
                          opacity: hoveredProduct === product.id ? 1 : 0
                        }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <ImageWithFallback
                          src={product.hoverImage}
                          alt={`${product.name} - Alternate view`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                    
                    {/* PROMINENT Badge - Top Left */}
                    <div className="absolute top-4 left-4">
                      <motion.span 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        style={{ 
                          backgroundColor: product.badge === 'Best Seller' ? colors.gold :
                                          product.badge === 'New Arrival' ? colors.teal :
                                          colors.charcoal,
                          color: 'white'
                        }}
                      >
                        {product.badge}
                      </motion.span>
                    </div>

                    {/* PROMINENT Discount Badge - Top Right */}
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                          className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                          style={{ backgroundColor: '#EF4444', color: 'white' }}
                        >
                          SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </motion.div>
                      </div>
                    )}

                    {/* Enhanced Stock Indicator with Color-Coded Progress */}
                    {product.stock <= 10 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                          <div className="flex justify-between text-xs font-bold mb-2" style={{ color: '#EF4444' }}>
                            <span>🔥 Limited Stock!</span>
                            <span>Only {product.stock} Left</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(product.stock / 50) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: '#EF4444' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions with Enhanced Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuickView(product)}
                        className="p-4 rounded-full bg-white shadow-xl"
                        style={{ color: colors.charcoal }}
                      >
                        <Eye className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 rounded-full bg-white shadow-xl"
                        style={{ color: colors.charcoal }}
                      >
                        <Heart className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Product Info - Better Spacing */}
                  <div className="p-7">
                    {/* Product Name */}
                    <h3 className="font-bold text-xl mb-3" style={{ color: colors.charcoal }}>
                      {product.name}
                    </h3>
                    
                    {/* LARGER Star Ratings */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5"
                            fill={i < Math.floor(product.rating) ? colors.gold : 'none'}
                            style={{ color: colors.gold }}
                          />
                        ))}
                      </div>
                      <span className="text-base font-semibold text-gray-700">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Review Snippet */}
                    {product.reviewSnippet && (
                      <div className="flex items-start gap-2 mb-4 text-sm text-gray-600 italic">
                        <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                        <span>"{product.reviewSnippet}"</span>
                      </div>
                    )}

                    {/* Stock Progress Bar - Better Visual */}
                    {product.stock <= 20 && product.stock > 10 && (
                      <div className="mb-5">
                        <div className="flex justify-between text-sm font-bold mb-2" style={{ color: colors.teal }}>
                          <span>⚡ Selling Fast!</span>
                          <span>{product.stockPercent}% remaining</span>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${product.stockPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: product.stockPercent < 20 ? '#EF4444' : colors.teal }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Price Section - Better Alignment */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-3xl font-bold" style={{ color: colors.charcoal }}>
                          {convertPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg line-through text-gray-400 font-semibold">
                            {convertPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <div className="inline-block px-3 py-1 rounded-full text-sm font-bold"
                             style={{ backgroundColor: colors.teal + '20', color: colors.teal }}>
                          You Save {convertPrice(product.originalPrice - product.price)}
                        </div>
                      )}
                    </div>

                    {/* LARGER, More Engaging CTA Button with Pulse Animation */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      animate={{ 
                        boxShadow: hoveredProduct === product.id ? 
                          ['0 4px 15px rgba(30, 210, 175, 0.2)', '0 10px 30px rgba(30, 210, 175, 0.5)', '0 4px 15px rgba(30, 210, 175, 0.2)'] : 
                          '0 4px 15px rgba(30, 210, 175, 0.2)'
                      }}
                      transition={{ 
                        boxShadow: { duration: 1.5, repeat: hoveredProduct === product.id ? Infinity : 0 }
                      }}
                      className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all mb-4"
                      style={{ backgroundColor: colors.teal }}
                    >
                      <ShoppingBag className="w-6 h-6" />
                      Add to Cart
                    </motion.button>
                    
                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                        <span>Eco-Friendly Packaging</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                        <span>Fast & Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                        <span>Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: colors.charcoal }}
            >
              Shop Featured Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Perfect Summer Collection - Split Screen Banner */}
      <section className="py-20 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 h-[500px] md:h-[600px] overflow-hidden rounded-3xl"
          >
            {/* Left Side - Model Image */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full"
            >
              <img 
                src="figma:asset/a020935208b504b445d0064cdcf7ee44038d9c40.png"
                alt="Summer Collection"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center p-8 md:p-16 text-center"
              style={{ backgroundColor: colors.teal }}
            >
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide"
                  style={{ letterSpacing: '0.1em' }}
                >
                  THE PERFECT<br />SUMMER DRESS
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-white text-base md:text-lg leading-relaxed max-w-md mx-auto italic"
                  style={{ opacity: 0.95 }}
                >
                  Inspired by the Summer blues and the magical world under the sea, this collection by Alemais is made for the sun.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link to="/collection">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-white font-bold text-lg rounded-lg transition-all uppercase tracking-wider"
                      style={{ color: colors.teal }}
                    >
                      SHOP NOW
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Carousel Section */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Shop Our Best Sellers
            </h2>
            <p className="text-lg text-gray-600">
              The pieces our customers can't stop talking about
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${currentBestSeller * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {bestSellers.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.12, rotate: 2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        
                        {/* BEST SELLER Badge - Prominent */}
                        <div className="absolute top-4 left-4">
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                            style={{ backgroundColor: colors.gold, color: colors.charcoal }}
                          >
                            🔥 Best Seller
                          </motion.div>
                        </div>
                        
                        {/* Sold Count Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-2 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm shadow-lg flex items-center gap-1" 
                               style={{ color: colors.charcoal }}>
                            <TrendingUp className="w-4 h-4" style={{ color: colors.teal }} />
                            {product.sold.toLocaleString()} Sold
                          </div>
                        </div>
                        
                        {/* Quick Actions on Hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            className="p-3 rounded-full bg-white shadow-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              handleQuickView(product);
                            }}
                          >
                            <Eye className="w-5 h-5" style={{ color: colors.charcoal }} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            className="p-3 rounded-full bg-white shadow-xl"
                          >
                            <Heart className="w-5 h-5" style={{ color: colors.charcoal }} />
                          </motion.button>
                        </motion.div>
                      </div>
                      
                      <div className="p-7">
                        <h3 className="font-bold text-xl mb-3" style={{ color: colors.charcoal }}>
                          {product.name}
                        </h3>
                        
                        {/* Larger Star Ratings */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5"
                                fill={i < Math.floor(product.rating) ? colors.gold : 'none'}
                                style={{ color: colors.gold }}
                              />
                            ))}
                          </div>
                          <span className="text-base font-semibold text-gray-700">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        
                        {/* Price */}
                        <div className="mb-5">
                          <span className="text-3xl font-bold" style={{ color: colors.charcoal }}>
                            {convertPrice(product.price)}
                          </span>
                        </div>
                        
                        {/* Enhanced CTA Button */}
                        <Link to={`/product/${product.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white text-center transition-all flex items-center justify-center gap-2 mb-4"
                            style={{ backgroundColor: colors.teal, boxShadow: '0 4px 15px rgba(30, 210, 175, 0.3)' }}
                          >
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart
                          </motion.div>
                        </Link>
                        
                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <Leaf className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                            <span>Eco-Friendly Packaging</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                            <span>Fast & Free Shipping</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                            <span>Secure Payment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentBestSeller((prev) => (prev - 1 + bestSellers.length) % bestSellers.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
              style={{ color: colors.charcoal }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentBestSeller((prev) => (prev + 1) % bestSellers.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
              style={{ color: colors.charcoal }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {bestSellers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBestSeller(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: currentBestSeller === index ? colors.teal : '#D1D5DB',
                  width: currentBestSeller === index ? '2rem' : '0.5rem'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Not So Wintery - Split Screen Banner */}
      <section className="py-20 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 h-[500px] md:h-[600px] overflow-hidden rounded-3xl"
          >
            {/* Left Side - Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start justify-center p-8 md:p-16"
              style={{ backgroundColor: '#C7B299' }}
            >
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide"
                  style={{ letterSpacing: '0.15em' }}
                >
                  NOT SO WINTERY
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white text-base md:text-lg leading-relaxed max-w-md italic"
                  style={{ opacity: 0.95 }}
                >
                  Gear up for what's next. Embrace the Summer days in style, if you know, you know
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Link to="/collection">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-white font-bold text-base rounded-lg transition-all uppercase tracking-wider"
                      style={{ color: colors.charcoal }}
                    >
                      SHOP NOW
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Model Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-full"
            >
              <img 
                src="figma:asset/0a410c47b5375b14b3d8c85265a4fda6017f48b5.png"
                alt="Not So Wintery Collection"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals with Parallax */}
      <section className="py-20 px-4 overflow-hidden" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Fresh Styles for the Modern Wardrobe
            </h2>
            <p className="text-lg text-gray-600">
              Just landed: New pieces to elevate your everyday
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                    <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: colors.cream }}>
                      <motion.div
                        whileHover={{ scale: 1.15, rotateZ: 3 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      {/* NEW ARRIVAL Badge - Prominent */}
                      <div className="absolute top-4 left-4">
                        <motion.span
                          initial={{ rotate: -10, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                          className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                          style={{ backgroundColor: colors.teal, color: 'white' }}
                        >
                          {product.badge}
                        </motion.span>
                      </div>
                      
                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-4 right-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.6, type: 'spring' }}
                            className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                            style={{ backgroundColor: '#EF4444', color: 'white' }}
                          >
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2" style={{ color: colors.charcoal }}>
                        {product.name}
                      </h3>
                      
                      {/* Larger Star Ratings */}
                      <div className="flex items-center gap-2 mb-3">
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
                        <span className="text-sm font-semibold text-gray-700">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Better Price Display */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                            {convertPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-base line-through text-gray-400 font-semibold">
                              {convertPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold"
                               style={{ backgroundColor: colors.teal + '20', color: colors.teal }}>
                            Save {convertPrice(product.originalPrice - product.price)}
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced CTA */}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full px-4 py-3 rounded-lg font-bold text-base text-white text-center transition-all mb-3"
                        style={{ backgroundColor: colors.teal }}
                      >
                        Add to Cart
                      </motion.div>
                      
                      {/* Trust Badges */}
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-600 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Leaf className="w-3 h-3" style={{ color: colors.teal }} />
                          <span>Eco-Friendly</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="w-3 h-3" style={{ color: colors.teal }} />
                          <span>Free Ship</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Lock className="w-3 h-3" style={{ color: colors.teal }} />
                          <span>Secure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Spotlight with 3D Zoom */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.charcoal }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Featured Product of the Week
            </h2>
            <p className="text-lg text-gray-300">
              Handpicked excellence in every stitch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image with 3D Hover */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageWithFallback
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: colors.gold, color: colors.charcoal }}
                  >
                    Limited Edition
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {spotlightProduct.name}
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      fill={i < Math.floor(spotlightProduct.rating) ? colors.gold : 'none'}
                      style={{ color: colors.gold }}
                    />
                  ))}
                </div>
                <span className="text-gray-300">
                  {spotlightProduct.rating} ({spotlightProduct.reviews} reviews)
                </span>
              </div>

              <p className="text-lg text-gray-300 mb-6">
                {spotlightProduct.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {spotlightProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.teal }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stock Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Limited Availability</span>
                  <span>{spotlightProduct.soldStock} of {spotlightProduct.totalStock} sold</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(spotlightProduct.soldStock / spotlightProduct.totalStock) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Hurry! Only {spotlightProduct.totalStock - spotlightProduct.soldStock} pieces remaining
                </p>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-white">
                      {convertPrice(spotlightProduct.price)}
                    </span>
                    <span className="text-xl line-through text-gray-500">
                      {convertPrice(spotlightProduct.originalPrice)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: colors.teal }}>
                    Save {Math.round(((spotlightProduct.originalPrice - spotlightProduct.price) / spotlightProduct.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/product/${spotlightProduct.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: colors.teal, color: colors.charcoal }}
                >
                  Shop Featured Product
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Collection */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E8F5E9' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <Leaf className="w-12 h-12" style={{ color: '#2E7D32' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Sustainable Fashion for a Better Future
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Beautiful pieces that care for our planet as much as they care for your style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecoProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                          <Leaf className="w-3 h-3" />
                          Eco-Friendly
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: colors.charcoal }}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <Recycle className="w-4 h-4 text-green-600" />
                        {product.eco}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
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
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                          {convertPrice(product.price)}
                        </span>
                        <div 
                          className="px-4 py-2 rounded-full font-semibold text-sm group-hover:translate-x-1 transition-transform"
                          style={{ backgroundColor: '#2E7D32', color: 'white' }}
                        >
                          Shop Now
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/collection?category=eco"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg"
              style={{ backgroundColor: '#2E7D32' }}
            >
              <Leaf className="w-5 h-5" />
              Shop Eco-Friendly Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.charcoal }}>
              New Arrivals
            </h2>
            <Link 
              to="/collection?filter=new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: '#2563EB', color: 'white' }}
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Featured New Arrival */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 rounded-2xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.charcoal }}>
                  Merino Wool Turtleneck
                </h3>
                <Link
                  to="/product/merino-turtleneck-charcoal"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                  style={{ backgroundColor: '#2563EB', color: 'white' }}
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Featured Product Image */}
              <div className="mt-8 relative">
                <img 
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop"
                  alt="Merino Wool Turtleneck"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right: Small Product Cards */}
            <div className="flex flex-col gap-6">
              {/* Product 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link 
                  to="/product/cashmere-blend-cardigan"
                  className="flex items-center gap-6 bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all group"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop"
                      alt="Cashmere Blend Cardigan"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2" style={{ color: colors.charcoal }}>
                      Cashmere Blend Cardigan
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4" 
                          fill="#FFC107" 
                          style={{ color: '#FFC107' }}
                        />
                      ))}
                    </div>
                    <p className="text-xl font-bold" style={{ color: colors.charcoal }}>
                      {convertPrice(189.00)}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Product 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link 
                  to="/product/alpine-knit-sweater"
                  className="flex items-center gap-6 bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all group"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop"
                      alt="Alpine Knit Sweater"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2" style={{ color: colors.charcoal }}>
                      Alpine Knit Sweater
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4" 
                          fill="#FFC107" 
                          style={{ color: '#FFC107' }}
                        />
                      ))}
                    </div>
                    <p className="text-xl font-bold" style={{ color: colors.charcoal }}>
                      {convertPrice(159.00)}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Product 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link 
                  to="/product/heritage-wool-pullover"
                  className="flex items-center gap-6 bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all group"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1578681994506-b8f463449011?w=300&h=300&fit=crop"
                      alt="Heritage Wool Pullover"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2" style={{ color: colors.charcoal }}>
                      Heritage Wool Pullover
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4" 
                          fill="#FFC107" 
                          style={{ color: '#FFC107' }}
                        />
                      ))}
                    </div>
                    <p className="text-xl font-bold" style={{ color: colors.charcoal }}>
                      {convertPrice(219.00)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Carousel - Discover Our Collections */}
      <CollectionsCarousel />

      {/* Shop the Look */}
      <section className="py-20 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Complete Your Look
            </h2>
            <p className="text-lg text-gray-600">
              Curated outfits styled by our fashion experts
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `-${currentShopLook * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {shopTheLook.map((outfit) => (
                  <div
                    key={outfit.id}
                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                  >
                    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                      <div className="relative aspect-[3/4]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ImageWithFallback
                            src={outfit.image}
                            alt={outfit.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{outfit.name}</h3>
                          <p className="text-sm text-gray-300 mb-4">{outfit.items} items in this look</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Complete Set</div>
                              <div className="text-2xl font-bold">{convertPrice(outfit.totalPrice)}</div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 rounded-full font-semibold"
                              style={{ backgroundColor: colors.teal, color: colors.charcoal }}
                            >
                              Shop the Look
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentShopLook((prev) => (prev - 1 + shopTheLook.length) % shopTheLook.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 z-10"
              style={{ color: colors.charcoal }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentShopLook((prev) => (prev + 1) % shopTheLook.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 z-10"
              style={{ color: colors.charcoal }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Recommendations / Cross-Sell */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              You May Also Like
            </h2>
            <p className="text-lg text-gray-600">
              Complete your wardrobe with these complementary pieces
            </p>
          </motion.div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-8 min-w-max">
              {[...featuredProducts.slice(0, 4), ...newArrivals.slice(0, 2)].map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="w-80"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-4 left-4">
                            <span 
                              className="px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                              style={{ 
                                backgroundColor: product.badge === 'Best Seller' ? colors.gold :
                                                product.badge === 'New Arrival' ? colors.teal :
                                                colors.charcoal,
                                color: 'white'
                              }}
                            >
                              {product.badge}
                            </span>
                          </div>
                        )}
                        
                        {/* Discount Badge */}
                        {product.originalPrice && (
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-2 rounded-full text-sm font-bold shadow-lg"
                                 style={{ backgroundColor: '#EF4444', color: 'white' }}>
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2" style={{ color: colors.charcoal }}>
                          {product.name}
                        </h3>
                        
                        {/* Star Ratings */}
                        <div className="flex items-center gap-2 mb-3">
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
                          <span className="text-sm font-semibold text-gray-700">
                            ({product.reviews})
                          </span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                            {convertPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-base line-through text-gray-400 font-semibold">
                              {convertPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        {/* CTA */}
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full px-5 py-3 rounded-xl text-base font-bold text-center transition-all flex items-center justify-center gap-2 mb-3"
                          style={{ backgroundColor: colors.teal, color: 'white', boxShadow: '0 4px 15px rgba(30, 210, 175, 0.2)' }}
                        >
                          <ShoppingBag className="w-5 h-5" />
                          Add to Cart
                        </motion.div>
                        
                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-3 text-xs text-gray-600 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <Leaf className="w-3 h-3" style={{ color: colors.teal }} />
                            <span>Eco-Friendly</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" style={{ color: colors.teal }} />
                            <span>Free Ship</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Lock className="w-3 h-3" style={{ color: colors.teal }} />
                            <span>Secure</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Vacation Banner */}
      <section className="py-20 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden"
          >
            {/* Background Image */}
            <img 
              src="figma:asset/2dad1b9f422b8f009a42c4b932fa474e78c5d426.png"
              alt="Shop Vacation Collection"
              className="w-full h-full object-cover"
            />
            
            {/* Center Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <Link to="/collection" className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl cursor-pointer"
                  >
                    <ArrowRight className="w-6 h-6" style={{ color: colors.charcoal }} />
                    <span className="text-2xl md:text-3xl font-bold tracking-wide" style={{ color: colors.charcoal }}>
                      Shop Vacation
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Optional Subtle Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5"></div>
          </motion.div>
        </div>
      </section>

      {/* Shop All Products - Modern Product Grid */}
      <section className="py-24 px-4" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <ProductGrid 
            products={allProductsForGrid}
            title="Shop All Products"
            showFilters={true}
            onQuickView={(productId) => {
              const product = allProductsForGrid.find(p => p.id === productId);
              if (product) handleQuickView(product);
            }}
          />
        </div>
      </section>

      {/* Customer Reviews / Social Proof */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              What Our Customers Are Saying
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers worldwide
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <Quote className="w-12 h-12 mb-6" style={{ color: colors.teal }} />
                <p className="text-xl md:text-2xl mb-8 text-gray-700 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-lg" style={{ color: colors.charcoal }}>
                        {testimonials[currentTestimonial].name}
                      </h4>
                      {testimonials[currentTestimonial].verified && (
                        <CheckCircle className="w-5 h-5" style={{ color: colors.teal }} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {testimonials[currentTestimonial].location}
                    </p>
                    <div className="flex">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5"
                          fill={colors.gold}
                          style={{ color: colors.gold }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
              style={{ color: colors.charcoal }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
              style={{ color: colors.charcoal }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: currentTestimonial === index ? colors.teal : '#D1D5DB',
                  width: currentTestimonial === index ? '2rem' : '0.5rem'
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/reviews"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:bg-white transition-all"
              style={{ borderColor: colors.charcoal, color: colors.charcoal }}
            >
              Read More Reviews
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Locate Store Section */}
    <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: colors.cream }}>
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

      {/* Left Side - Store Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl"
      >
        <img
          src="figma:asset/9a3cb75f66e7667ef2aab3818f8d5b1748532772.png"
          alt="VIBRIVO Boutique Store"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Right Side - Store Information */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8 text-center lg:text-left"
      >

        {/* Title */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: colors.charcoal }}
          >
            Explore VIBRIVO<br />
            Boutiques Near You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            Visit our premium boutiques to experience the quality and craftsmanship of VIBRIVO in person. Our expert staff is ready to help you find your perfect piece.
          </motion.p>
        </div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Stat 1 */}
          <div className="space-y-2">
            <div className="flex justify-center lg:justify-start">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.teal }}
              >
                <span className="text-2xl font-bold text-white">80+</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold" style={{ color: colors.charcoal }}>
              VIBRIVO Boutiques
            </h3>
            <p className="text-sm text-gray-600">
              Premium stores worldwide
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2">
            <div className="flex justify-center lg:justify-start">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.gold }}
              >
                <span className="text-2xl font-bold text-white">18+</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold" style={{ color: colors.charcoal }}>
              Cities Worldwide
            </h3>
            <p className="text-sm text-gray-600">
              USA, UK, Canada & more
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center lg:justify-start"
        >
          <Link to="/stores" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-white text-lg transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: colors.teal }}
            >
              Locate Store
            </motion.button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="pt-6 border-t border-gray-300"
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold" style={{ color: colors.charcoal }}>
              Can't find a store near you?
            </span>
            <br />
            Shop our complete collection online with free shipping on orders over $100 and easy returns within 30 days.
          </p>
        </motion.div>

      </motion.div>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about VIBRIVO
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all"
                  style={{
                    borderLeft: openFaqIndex === index ? `4px solid ${colors.teal}` : '4px solid transparent'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-lg pr-4" style={{ color: colors.charcoal }}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown 
                        className="w-6 h-6 flex-shrink-0" 
                        style={{ color: openFaqIndex === index ? colors.teal : colors.charcoal }}
                      />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: colors.charcoal }}>
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help 24/7
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold text-white transition-all"
                style={{ backgroundColor: colors.teal }}
              >
                Contact Support
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Product of the Week */}
      <FeaturedProductWeek />

      {/* Customer Reviews - What Our Customers Are Saying */}
      <CustomerReviews />

      {/* Newsletter CTA - Join the VIBRIVO Family */}
      <NewsletterCTA />

      {/* Trust Badges & Footer */}
      <section className="py-12 px-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Leaf, text: 'Eco-Friendly Packaging', subtext: 'Sustainable materials' },
              { icon: Truck, text: 'Fast & Free Shipping', subtext: 'On all orders' },
              { icon: Lock, text: 'Secure Payment', subtext: 'SSL encrypted' },
              { icon: Award, text: 'Premium Quality', subtext: 'Satisfaction guaranteed' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-12 h-12 mx-auto mb-3" style={{ color: colors.teal }} />
                <h4 className="font-semibold mb-1" style={{ color: colors.charcoal }}>{item.text}</h4>
                <p className="text-sm text-gray-600">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                <h3 className="text-xl font-bold" style={{ color: colors.charcoal }}>Quick View</h3>
                <button
                  onClick={() => setShowQuickView(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: colors.charcoal }}>
                    {quickViewProduct.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5"
                          fill={i < Math.floor(quickViewProduct.rating) ? colors.gold : 'none'}
                          style={{ color: colors.gold }}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({quickViewProduct.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl font-bold" style={{ color: colors.charcoal }}>
                      {convertPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xl line-through text-gray-400">
                        {convertPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  {quickViewProduct.stock <= 10 && (
                    <p className="text-sm font-semibold text-red-600 mb-4">
                      ⚠️ Only {quickViewProduct.stock} left in stock!
                    </p>
                  )}
                  
                  <div className="flex gap-3 mb-6">
                    <Link
                      to={`/product/${quickViewProduct.id}`}
                      className="flex-1 px-6 py-3 rounded-full font-semibold text-center text-white"
                      style={{ backgroundColor: colors.teal }}
                    >
                      View Full Details
                    </Link>
                    <button
                      className="px-6 py-3 rounded-full font-semibold border-2"
                      style={{ borderColor: colors.charcoal, color: colors.charcoal }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              
              <Gift className="w-16 h-16 mx-auto mb-4" style={{ color: colors.teal }} />
              <h3 className="text-3xl font-bold mb-4" style={{ color: colors.charcoal }}>
                Wait! Don't Leave Empty-Handed
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get <span className="font-bold" style={{ color: colors.teal }}>20% OFF</span> your first order
              </p>
              
              <form className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-3 rounded-full border-2 border-gray-300 mb-3 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  Claim My Discount
                </button>
              </form>
              
              <p className="text-xs text-gray-500">
                *Valid for first-time customers only
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fit Finder Modal */}
      <AnimatePresence>
        {showFitFinder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFitFinder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Ruler className="w-8 h-8" style={{ color: colors.teal }} />
                  <h3 className="text-3xl font-bold" style={{ color: colors.charcoal }}>
                    Interactive Fit Finder
                  </h3>
                </div>
                <button
                  onClick={() => setShowFitFinder(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-8">
                Get personalized size recommendations based on your measurements and preferences
              </p>

              <form onSubmit={handleFitFinderSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.charcoal }}>
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={fitFinderData.height}
                      onChange={(e) => setFitFinderData({ ...fitFinderData, height: e.target.value })}
                      placeholder="175"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.charcoal }}>
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={fitFinderData.weight}
                      onChange={(e) => setFitFinderData({ ...fitFinderData, weight: e.target.value })}
                      placeholder="70"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.charcoal }}>
                    Body Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['slim', 'regular', 'athletic'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFitFinderData({ ...fitFinderData, bodyType: type })}
                        className="px-4 py-3 rounded-lg border-2 font-semibold capitalize transition-all"
                        style={{
                          borderColor: fitFinderData.bodyType === type ? colors.teal : '#E5E5E5',
                          backgroundColor: fitFinderData.bodyType === type ? colors.teal : 'white',
                          color: fitFinderData.bodyType === type ? 'white' : colors.charcoal
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.charcoal }}>
                    Preferred Fit
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['slim', 'regular', 'oversized'].map((fit) => (
                      <button
                        key={fit}
                        type="button"
                        onClick={() => setFitFinderData({ ...fitFinderData, preferredFit: fit })}
                        className="px-4 py-3 rounded-lg border-2 font-semibold capitalize transition-all"
                        style={{
                          borderColor: fitFinderData.preferredFit === fit ? colors.teal : '#E5E5E5',
                          backgroundColor: fitFinderData.preferredFit === fit ? colors.teal : 'white',
                          color: fitFinderData.preferredFit === fit ? 'white' : colors.charcoal
                        }}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>

                {recommendedSize && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl text-center"
                    style={{ backgroundColor: colors.cream }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircle className="w-6 h-6" style={{ color: colors.teal }} />
                      <h4 className="text-xl font-bold" style={{ color: colors.charcoal }}>
                        Your Recommended Size
                      </h4>
                    </div>
                    <div className="text-5xl font-bold mb-2" style={{ color: colors.teal }}>
                      {recommendedSize}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on your measurements and preferred fit
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-6 py-4 rounded-full font-semibold text-white"
                    style={{ backgroundColor: colors.teal }}
                  >
                    Calculate My Size
                  </motion.button>
                  {recommendedSize && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowFitFinder(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-4 rounded-full font-semibold border-2"
                      style={{ borderColor: colors.charcoal, color: colors.charcoal }}
                    >
                      Start Shopping
                    </motion.button>
                  )}
                </div>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 Pro Tip:</strong> Our sweaters are designed with a relaxed fit. 
                  If you're between sizes, we recommend sizing down for a more fitted look.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fit Finder Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFitFinder(true)}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-2xl flex items-center gap-3"
        style={{ backgroundColor: colors.teal, color: 'white' }}
      >
        <Ruler className="w-6 h-6" />
        <span className="font-semibold hidden md:block">Find Your Size</span>
      </motion.button>

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}
