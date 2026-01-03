import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, TrendingUp, Sparkles, Clock, Award, ShoppingBag, ChevronRight, Package, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface ProductSectionsProps {
  convertPrice: (price: number) => string;
}

export function HomepageProductSections({ convertPrice }: ProductSectionsProps) {
  // Product data
  const bestSellers = [
    { id: 11, name: 'Cashmere Essential Crewneck', price: 189, originalPrice: 249, rating: 4.9, reviews: 1234, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600', badge: 'Best Seller' },
    { id: 12, name: 'Merino Wool V-Neck', price: 149, originalPrice: 199, rating: 4.8, reviews: 987, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600', badge: 'Best Seller' },
    { id: 13, name: 'Alpaca Blend Cardigan', price: 229, originalPrice: 289, rating: 5.0, reviews: 856, image: 'https://images.unsplash.com/photo-1612797748239-a83ed306dcfc?w=600', badge: 'Best Seller' },
    { id: 14, name: 'Cotton Cashmere Pullover', price: 169, originalPrice: 219, rating: 4.9, reviews: 743, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600', badge: 'Best Seller' },
  ];

  const newArrivals = [
    { id: 21, name: 'Heritage Wool Sweater', price: 199, rating: 5.0, reviews: 322, image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600', badge: 'New', isNew: true },
    { id: 22, name: 'Organic Cotton Knit', price: 139, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600', badge: 'New', isNew: true },
    { id: 23, name: 'Cashmere Turtleneck', price: 219, rating: 5.0, reviews: 389, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', badge: 'New', isNew: true },
    { id: 24, name: 'Recycled Wool Cardigan', price: 179, rating: 4.8, reviews: 512, image: 'https://images.unsplash.com/photo-1558932923-87e08d654d78?w=600', badge: 'New', isNew: true },
  ];

  const limitedEdition = [
    { id: 31, name: 'Winter Heritage Edition', price: 299, originalPrice: 399, rating: 5.0, reviews: 445, image: 'https://images.unsplash.com/photo-1622595731029-8b6e1cf88e20?w=600', badge: 'Limited', stock: 23 },
    { id: 32, name: 'Artisan Knit Collection', price: 349, originalPrice: 449, rating: 5.0, reviews: 567, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', badge: 'Limited', stock: 15 },
    { id: 33, name: 'Luxury Cashmere Set', price: 499, originalPrice: 649, rating: 5.0, reviews: 678, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', badge: 'Limited', stock: 8 },
  ];

  const winterEssentials = [
    { id: 41, name: 'Chunky Cable Knit', price: 189, rating: 4.9, reviews: 892, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600' },
    { id: 42, name: 'Thermal Wool Sweater', price: 159, rating: 4.8, reviews: 734, image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600' },
    { id: 43, name: 'Fleece-Lined Cardigan', price: 199, rating: 5.0, reviews: 623, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600' },
    { id: 44, name: 'Arctic Wool Pullover', price: 229, rating: 4.9, reviews: 1123, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600' },
  ];

  const categories = [
    { name: 'Sweaters', count: 48, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', link: '/collection/sweaters' },
    { name: 'Clothing', count: 72, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500', link: '/collection/clothing' },
    { name: 'Shoes', count: 36, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', link: '/collection/shoes' },
    { name: 'Bags', count: 24, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', link: '/collection/bags' },
    { name: 'Lifestyle', count: 42, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500', link: '/collection/lifestyle' },
  ];

  const shopTheLook = [
    { 
      id: 51, 
      name: 'Minimalist Weekend', 
      price: 389, 
      originalPrice: 549, 
      items: ['Cashmere Sweater', 'Wool Pants', 'Leather Bag'],
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700',
      savings: 160
    },
    { 
      id: 52, 
      name: 'Cozy Office Look', 
      price: 429, 
      originalPrice: 599, 
      items: ['Merino Cardigan', 'Cotton Shirt', 'Dress Shoes'],
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700',
      savings: 170
    },
    { 
      id: 53, 
      name: 'Winter Getaway', 
      price: 499, 
      originalPrice: 699, 
      items: ['Cable Knit Sweater', 'Wool Scarf', 'Leather Boots'],
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700',
      savings: 200
    },
  ];

  const topRated = [
    { id: 61, name: 'Premium Cashmere V-Neck', price: 199, rating: 5.0, reviews: 1577, image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600' },
    { id: 62, name: 'Sustainable Wool Blend', price: 169, rating: 5.0, reviews: 1423, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600' },
    { id: 63, name: 'Luxury Alpaca Sweater', price: 249, rating: 5.0, reviews: 1289, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600' },
    { id: 64, name: 'Organic Cotton Cardigan', price: 179, rating: 5.0, reviews: 1156, image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600' },
  ];

  return (
    <>
      {/* BEST SELLERS */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#1ED2AF]/10 px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-[#1ED2AF]" />
            <span className="font-bold text-[#111111]">CUSTOMER FAVORITES</span>
          </div>
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">Best Sellers</h2>
          <p className="text-xl text-gray-600">Our most popular premium pieces that everyone loves</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {bestSellers.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1ED2AF] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#111111] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#111111]">{convertPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through">{convertPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container mx-auto px-4 py-20 bg-[#F5F3EE]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#C7A14A] px-6 py-3 rounded-full text-white mb-6 font-bold">
            <Sparkles className="w-5 h-5" />
            JUST DROPPED
          </div>
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">New Arrivals</h2>
          <p className="text-xl text-gray-600">Fresh styles for the modern wardrobe</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-gradient-to-r from-[#1ED2AF] to-[#17c5a3] text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#111111] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <span className="text-2xl font-bold text-[#111111]">{convertPrice(product.price)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIMITED EDITION COLLECTION */}
      <section className="py-20 bg-gradient-to-br from-[#111111] to-[#2a2a2a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#C7A14A] px-6 py-3 rounded-full text-white mb-6 font-bold">
              <Award className="w-5 h-5" />
              EXCLUSIVE COLLECTION
            </div>
            <h2 className="text-5xl mb-4 text-white font-bold">Limited Edition Collection</h2>
            <p className="text-xl text-gray-300">Handcrafted pieces in limited quantities</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {limitedEdition.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden aspect-square">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.badge}
                      </span>
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Only {product.stock} left
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-white mb-2 text-xl">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                      ))}
                      <span className="text-sm text-gray-300 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{convertPrice(product.price)}</span>
                      <span className="text-gray-400 line-through">{convertPrice(product.originalPrice)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WINTER ESSENTIALS */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-6 py-3 rounded-full mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-600">SEASONAL COLLECTION</span>
          </div>
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">Winter Essentials</h2>
          <p className="text-xl text-gray-600">Stay warm in luxury with our winter collection</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {winterEssentials.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#111111] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <span className="text-2xl font-bold text-[#111111]">{convertPrice(product.price)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="container mx-auto px-4 py-20 bg-[#F5F3EE]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">Shop by Category</h2>
          <p className="text-xl text-gray-600">Explore our curated collections</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={category.link}>
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count} items</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SHOP THE LOOK */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-3 rounded-full mb-6">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-600">COMPLETE OUTFITS</span>
            </div>
            <h2 className="text-5xl mb-4 text-[#111111] font-bold">Shop the Look</h2>
            <p className="text-xl text-gray-600">Curated outfits at unbeatable bundle prices</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {shopTheLook.map((bundle, idx) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <ImageWithFallback
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                    Save {convertPrice(bundle.savings)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#111111] mb-3">{bundle.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {bundle.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#1ED2AF] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#111111]">{convertPrice(bundle.price)}</span>
                    <span className="text-xl text-gray-400 line-through">{convertPrice(bundle.originalPrice)}</span>
                  </div>
                  <Link
                    to={`/bundle/${bundle.id}`}
                    className="block w-full bg-[#1ED2AF] text-white text-center py-3 rounded-xl font-bold hover:bg-[#17c5a3] transition-colors"
                  >
                    Shop Bundle
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP RATED PRODUCTS */}
      <section className="container mx-auto px-4 py-20 bg-[#F5F3EE]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-6 py-3 rounded-full mb-6">
            <Award className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-600">5-STAR RATED</span>
          </div>
          <h2 className="text-5xl mb-4 text-[#111111] font-bold">Top Rated Products</h2>
          <p className="text-xl text-gray-600">Loved by thousands of customers</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {topRated.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      5.0
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#111111] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A14A] text-[#C7A14A]" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <span className="text-2xl font-bold text-[#111111]">{convertPrice(product.price)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
