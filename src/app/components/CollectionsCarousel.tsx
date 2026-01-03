import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  link: string;
}

const collections: Collection[] = [
  {
    id: 'cashmere',
    name: 'Cashmere Sweaters',
    description: 'Luxurious handcrafted cashmere for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    itemCount: 24,
    link: '/collection/cashmere',
  },
  {
    id: 'winter',
    name: 'Winter Essentials',
    description: 'Stay warm with our cozy winter collection',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    itemCount: 32,
    link: '/collection/winter',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Wear',
    description: 'Everyday comfort meets timeless style',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    itemCount: 18,
    link: '/collection/lifestyle',
  },
  {
    id: 'sustainable',
    name: 'Sustainable Collection',
    description: 'Eco-friendly fashion for a better tomorrow',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    itemCount: 16,
    link: '/collection/sustainable',
  },
];

export function CollectionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= collections.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, collections.length - itemsPerView) : prev - 1
    );
  };

  const visibleCollections = collections.slice(currentIndex, currentIndex + itemsPerView);
  
  // Fill remaining slots if needed
  while (visibleCollections.length < itemsPerView && collections.length > 0) {
    visibleCollections.push(collections[visibleCollections.length % collections.length]);
  }

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
            Discover Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated selections of premium clothing designed for modern living and sustainable fashion
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: colors.charcoal }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= collections.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: colors.charcoal }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="sync">
              {visibleCollections.map((collection, index) => (
                <motion.div
                  key={`${collection.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <Link to={collection.link} className="block">
                    {/* Collection Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full"
                      >
                        <ImageWithFallback
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {/* Collection Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-2">
                          <span className="text-sm font-semibold opacity-80">
                            {collection.itemCount} Items
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-gray-200 mb-4">
                          {collection.description}
                        </p>
                        
                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all"
                          style={{ backgroundColor: colors.gold, color: colors.charcoal }}
                        >
                          Explore Collection
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(collections.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: Math.floor(currentIndex / itemsPerView) === index ? colors.gold : '#D1D5DB',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}