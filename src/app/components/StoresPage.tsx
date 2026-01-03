import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A',
};

interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  hours: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

const stores: Store[] = [
  {
    id: 1,
    name: 'VIBRIVO Flagship - New York',
    address: '123 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1 (212) 555-0101',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
    image: 'figma:asset/9a3cb75f66e7667ef2aab3818f8d5b1748532772.png',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: 2,
    name: 'VIBRIVO Los Angeles',
    address: '456 Rodeo Drive',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    country: 'USA',
    phone: '+1 (310) 555-0102',
    hours: 'Mon-Sat: 10am-9pm, Sun: 11am-7pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 3,
    name: 'VIBRIVO Chicago',
    address: '789 Michigan Avenue',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60611',
    country: 'USA',
    phone: '+1 (312) 555-0103',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: 4,
    name: 'VIBRIVO Miami',
    address: '321 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    country: 'USA',
    phone: '+1 (305) 555-0104',
    hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-7pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: 5,
    name: 'VIBRIVO San Francisco',
    address: '654 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'USA',
    phone: '+1 (415) 555-0105',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 6,
    name: 'VIBRIVO London',
    address: '12 Bond Street',
    city: 'London',
    state: 'England',
    zipCode: 'W1S 1SU',
    country: 'UK',
    phone: '+44 20 7555 0106',
    hours: 'Mon-Sat: 10am-8pm, Sun: 12pm-6pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: 7,
    name: 'VIBRIVO Toronto',
    address: '88 Bloor Street West',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5S 1M5',
    country: 'Canada',
    phone: '+1 (416) 555-0107',
    hours: 'Mon-Sat: 10am-9pm, Sun: 11am-6pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 43.6532, lng: -79.3832 },
  },
  {
    id: 8,
    name: 'VIBRIVO Vancouver',
    address: '456 Robson Street',
    city: 'Vancouver',
    state: 'BC',
    zipCode: 'V6B 2B5',
    country: 'Canada',
    phone: '+1 (604) 555-0108',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
    image: 'https://images.unsplash.com/photo-1758670496782-cb11b7b56675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2NzM4MjgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    coordinates: { lat: 49.2827, lng: -123.1207 },
  },
];

export function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countries = ['All', 'USA', 'UK', 'Canada'];

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || store.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src="figma:asset/9a3cb75f66e7667ef2aab3818f8d5b1748532772.png"
            alt="VIBRIVO Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Find a VIBRIVO Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Visit one of our premium boutiques to experience the quality and craftsmanship firsthand
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by city, state, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                style={{ backgroundColor: 'white' }}
              />
            </div>

            {/* Country Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedCountry === country
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  style={
                    selectedCountry === country
                      ? { backgroundColor: colors.teal }
                      : undefined
                  }
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Store Count */}
          <p className="text-gray-600 mb-8">
            Showing {filteredStores.length} of {stores.length} stores
          </p>

          {/* Stores Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Store Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Store Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold" style={{ color: colors.charcoal }}>
                    {store.name}
                  </h3>

                  <div className="space-y-3">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="flex-shrink-0 mt-1" style={{ color: colors.teal }} />
                      <div className="text-sm text-gray-600">
                        <p>{store.address}</p>
                        <p>
                          {store.city}, {store.state} {store.zipCode}
                        </p>
                        <p>{store.country}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <Phone size={18} style={{ color: colors.teal }} />
                      <a
                        href={`tel:${store.phone}`}
                        className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="flex-shrink-0 mt-1" style={{ color: colors.teal }} />
                      <p className="text-sm text-gray-600">{store.hours}</p>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <button
                    className="w-full py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.teal }}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`,
                        '_blank'
                      )
                    }
                  >
                    <Navigation size={18} />
                    Get Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No stores found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('All');
                }}
                className="px-6 py-3 rounded-full font-semibold text-white"
                style={{ backgroundColor: colors.teal }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Store Stats Section */}
      <section className="py-16 px-4" style={{ backgroundColor: colors.charcoal }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-5xl font-bold mb-2" style={{ color: colors.teal }}>
                80+
              </h3>
              <p className="text-gray-300">Premium Boutiques Worldwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-5xl font-bold mb-2" style={{ color: colors.gold }}>
                18+
              </h3>
              <p className="text-gray-300">Cities Across USA, UK, Canada</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-5xl font-bold mb-2" style={{ color: colors.teal }}>
                500K+
              </h3>
              <p className="text-gray-300">Happy Customers Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.charcoal }}>
              Can't Visit a Store?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Shop our complete collection online with free shipping on orders over $100, easy returns
              within 30 days, and dedicated customer support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: colors.teal }}
              >
                Shop Online
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full font-semibold transition-all hover:bg-gray-100 border-2"
                style={{ borderColor: colors.charcoal, color: colors.charcoal }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
