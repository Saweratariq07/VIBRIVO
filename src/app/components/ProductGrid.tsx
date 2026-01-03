import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface Product {
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
  category?: string;
  inStock?: boolean;
  stockCount?: number;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
  onQuickView?: (productId: string) => void;
}

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
type FilterCategory = 'all' | 'sweaters' | 'accessories' | 'lifestyle';

export function ProductGrid({ products, title, showFilters = true, onQuickView }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'New Arrivals' },
  ];

  const filterCategories = [
    { value: 'all', label: 'All Products' },
    { value: 'sweaters', label: 'Sweaters' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((p) => p.category?.toLowerCase() === filterCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming products are already ordered by newest
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [products, sortBy, filterCategory]);

  return (
    <div className="w-full">
      {/* Header */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
            {title}
          </h2>
        </motion.div>
      )}

      {/* Filters and Sort */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-6 py-3 border-2 rounded-full hover:shadow-md transition-all"
              style={{ borderColor: colors.charcoal, color: colors.charcoal }}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-semibold">
                {filterCategories.find((c) => c.value === filterCategory)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-20 min-w-[200px]"
              >
                {filterCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setFilterCategory(category.value as FilterCategory);
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                      filterCategory === category.value ? 'font-bold' : ''
                    }`}
                    style={{
                      backgroundColor:
                        filterCategory === category.value ? colors.cream : 'transparent',
                      color: colors.charcoal,
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Results Count */}
          <div className="text-gray-600">
            Showing <span className="font-bold">{filteredAndSortedProducts.length}</span> products
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-6 py-3 border-2 rounded-full hover:shadow-md transition-all"
              style={{ borderColor: colors.charcoal, color: colors.charcoal }}
            >
              <span className="font-semibold">
                Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-20 min-w-[220px]"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value as SortOption);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                      sortBy === option.value ? 'font-bold' : ''
                    }`}
                    style={{
                      backgroundColor: sortBy === option.value ? colors.cream : 'transparent',
                      color: colors.charcoal,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredAndSortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              {...product}
              onQuickView={() => onQuickView?.(product.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-2xl text-gray-400">No products found</p>
          <button
            onClick={() => {
              setFilterCategory('all');
              setSortBy('featured');
            }}
            className="mt-4 px-6 py-3 rounded-full font-semibold text-white"
            style={{ backgroundColor: colors.teal }}
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
