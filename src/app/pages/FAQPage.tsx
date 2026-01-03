import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Orders & Shipping
  {
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is also available at checkout. You\'ll receive a tracking number via email once your order ships.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to over 100 countries worldwide. International shipping times vary by location (typically 7-14 business days). Customs fees and import duties may apply and are the responsibility of the customer.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Is shipping free?',
    answer: 'Yes, we offer free standard shipping on all orders. Express shipping is available for an additional fee at checkout.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the Order History page.'
  },

  // Returns & Exchanges
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We offer hassle-free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Return shipping is free, and refunds are processed within 5-7 business days of receiving your return.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I start a return?',
    answer: 'Log into your account, go to Order History, select the order you want to return, and click "Request Return." You\'ll receive a prepaid return label via email within 24 hours.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'Can I exchange an item?',
    answer: 'Yes! If you\'d like a different size or color, you can request an exchange through your account. We\'ll ship your new item as soon as we receive your return.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'Are final sale items returnable?',
    answer: 'Items marked as "Final Sale" are not eligible for returns or exchanges. Please review product details carefully before purchasing.'
  },

  // Payment & Pricing
  {
    category: 'Payment & Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.'
  },
  {
    category: 'Payment & Pricing',
    question: 'Do you offer price matching?',
    answer: 'Yes! If you find the same item for a lower price at an authorized retailer within 14 days of purchase, we\'ll match the price. Contact our customer support with proof of the lower price.'
  },
  {
    category: 'Payment & Pricing',
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees! The price you see at checkout is the final price, including all applicable taxes. International customers may be responsible for customs duties.'
  },
  {
    category: 'Payment & Pricing',
    question: 'Do you offer gift cards?',
    answer: 'Yes! VIBRIVO gift cards are available in denominations from $25 to $500. They never expire and can be used on any product.'
  },

  // Product & Sizing
  {
    category: 'Product & Sizing',
    question: 'How do I find my size?',
    answer: 'Each product page includes a detailed Size Guide with measurements. We recommend measuring your favorite garment and comparing it to our size chart. Our customer support team is also happy to help with sizing questions.'
  },
  {
    category: 'Product & Sizing',
    question: 'Are your products true to size?',
    answer: 'Yes, our products generally run true to size. However, each product page includes specific fit information (e.g., "runs small," "relaxed fit") to help you choose the right size.'
  },
  {
    category: 'Product & Sizing',
    question: 'What materials do you use?',
    answer: 'We use premium, ethically-sourced materials including 100% cashmere, organic cotton, merino wool, and sustainable fabrics. Each product page lists detailed material information.'
  },
  {
    category: 'Product & Sizing',
    question: 'How do I care for my VIBRIVO products?',
    answer: 'Care instructions are included on each product page and on the garment\'s care label. Most cashmere items should be dry cleaned or hand washed in cold water. Specific care instructions vary by material.'
  },

  // Account & Orders
  {
    category: 'Account & Orders',
    question: 'Do I need an account to place an order?',
    answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, earn loyalty rewards, and access exclusive member benefits.'
  },
  {
    category: 'Account & Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, items may have already been prepared for shipping. Contact customer support immediately if you need to make changes.'
  },
  {
    category: 'Account & Orders',
    question: 'What is your loyalty program?',
    answer: 'Our VIBRIVO Rewards program lets you earn 1 point for every dollar spent. Points can be redeemed for discounts on future purchases. Members also get early access to sales and exclusive offers.'
  },

  // Sustainability
  {
    category: 'Sustainability',
    question: 'Are VIBRIVO products sustainable?',
    answer: 'Yes! We\'re committed to sustainability. We use eco-friendly packaging, source ethically-produced materials, and work with suppliers who share our values. Learn more on our Sustainability page.'
  },
  {
    category: 'Sustainability',
    question: 'Is your packaging recyclable?',
    answer: 'Absolutely! Our shipping boxes are made from 100% recycled materials and are fully recyclable. Our garment bags are biodegradable, and we use minimal plastic.'
  }
];

export function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions about orders, shipping, returns, and more
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedCategory === category ? { backgroundColor: colors.teal } : {}}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No results found. Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: colors.teal }}>
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-lg" style={{ color: colors.charcoal }}>
                      {faq.question}
                    </h3>
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0" style={{ color: colors.teal }} />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Still Have Questions Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.charcoal }}>
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our customer support team is here to help 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:support@vibrivo.com"
              className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: colors.teal }}
            >
              Email Support
            </a>
            <a
              href="tel:+1-800-VIBRIVO"
              className="px-8 py-3 rounded-full font-semibold border-2 transition-all hover:bg-gray-100"
              style={{ borderColor: colors.charcoal, color: colors.charcoal }}
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
