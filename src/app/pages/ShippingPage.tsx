import { Truck, Package, RotateCcw, Globe, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

export function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4" 
            style={{ color: colors.charcoal }}
          >
            Shipping & Returns
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Fast, free shipping and hassle-free returns on all orders
          </motion.p>
        </div>
      </div>

      {/* Shipping Options Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: colors.charcoal }}>
          Shipping Options
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Standard Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Truck className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                  Standard Shipping
                </h3>
                <p className="text-lg font-semibold" style={{ color: colors.teal }}>FREE</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Delivery in 3-5 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Tracking number provided</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Available on all orders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Signature not required</span>
              </li>
            </ul>
          </motion.div>

          {/* Express Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 rounded-xl p-8 hover:shadow-lg transition-all"
            style={{ borderColor: colors.gold }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.gold + '20' }}
              >
                <Package className="w-8 h-8" style={{ color: colors.gold }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                  Express Shipping
                </h3>
                <p className="text-lg font-semibold" style={{ color: colors.gold }}>$15</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.gold }} />
                <span>Delivery in 1-2 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.gold }} />
                <span>Priority handling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.gold }} />
                <span>Real-time tracking updates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.gold }} />
                <span>Signature required for delivery</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* International Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-8"
        >
          <div className="flex items-start gap-4">
            <Globe className="w-8 h-8 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.charcoal }}>
                International Shipping
              </h3>
              <p className="text-gray-700 mb-4">
                We ship to over 100 countries worldwide! International shipping rates and delivery times vary by destination.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                  <span>Typical delivery: 7-14 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                  <span>Customs forms prepared automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                  <span>Full tracking provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                  <span className="italic">Note: Customs fees and import duties may apply and are the responsibility of the customer</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Processing Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.charcoal }}>
            Order Processing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Clock className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-2">Order Confirmation</h3>
              <p className="text-gray-600">
                You'll receive an email confirmation within minutes of placing your order.
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <Package className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-2">Order Preparation</h3>
              <p className="text-gray-600">
                Orders are typically processed and shipped within 24-48 hours.
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <MapPin className="w-8 h-8" style={{ color: colors.teal }} />
              </div>
              <h3 className="font-bold text-lg mb-2">Tracking Updates</h3>
              <p className="text-gray-600">
                Track your package every step of the way with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: colors.charcoal }}>
          Hassle-Free Returns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.teal + '20' }}
              >
                <RotateCcw className="w-6 h-6" style={{ color: colors.teal }} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                30-Day Return Policy
              </h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Changed your mind? No problem! We offer hassle-free returns within 30 days of delivery. 
              Items must be unworn, unwashed, and in original condition with tags attached.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Free return shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Prepaid return labels included</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Refunds processed in 5-7 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.teal }} />
                <span>Full refund to original payment method</span>
              </li>
            </ul>
          </motion.div>

          {/* How to Return */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.gold + '20' }}
              >
                <Shield className="w-6 h-6" style={{ color: colors.gold }} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                How to Return
              </h3>
            </div>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  1
                </span>
                <div>
                  <p className="font-semibold mb-1">Log into Your Account</p>
                  <p className="text-sm">Visit your Order History and select the order you want to return.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  2
                </span>
                <div>
                  <p className="font-semibold mb-1">Request Return</p>
                  <p className="text-sm">Click "Request Return" and select the items you'd like to return.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  3
                </span>
                <div>
                  <p className="font-semibold mb-1">Print Label</p>
                  <p className="text-sm">You'll receive a prepaid return label via email within 24 hours.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  4
                </span>
                <div>
                  <p className="font-semibold mb-1">Ship It Back</p>
                  <p className="text-sm">Pack your items, attach the label, and drop off at any carrier location.</p>
                </div>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Shipping or Returns?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Our customer support team is available 24/7 to help
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/faq"
              className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.teal }}
            >
              Visit FAQ
            </a>
            <a
              href="/contact"
              className="px-8 py-3 rounded-full font-semibold bg-white transition-all hover:bg-gray-100"
              style={{ color: colors.charcoal }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
