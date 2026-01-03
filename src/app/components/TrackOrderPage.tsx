import { useState } from 'react';
import { Package, Search, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';

export function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!orderNumber || !email) {
      setError('Please enter both order number and email address');
      return;
    }

    // Mock tracking data
    setTracking({
      orderNumber: orderNumber,
      status: 'in_transit',
      estimatedDelivery: 'December 22, 2024',
      carrier: 'Royal Mail',
      trackingNumber: 'RM' + Math.random().toString(36).substring(7).toUpperCase(),
      updates: [
        {
          date: 'December 18, 2024',
          time: '2:30 PM',
          status: 'Out for Delivery',
          location: 'London Distribution Center',
          completed: false,
        },
        {
          date: 'December 17, 2024',
          time: '8:15 AM',
          status: 'In Transit',
          location: 'Birmingham Sorting Facility',
          completed: true,
        },
        {
          date: 'December 16, 2024',
          time: '4:45 PM',
          status: 'Package Shipped',
          location: 'VIBRIVO Warehouse',
          completed: true,
        },
        {
          date: 'December 16, 2024',
          time: '10:00 AM',
          status: 'Order Processed',
          location: 'VIBRIVO Warehouse',
          completed: true,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-[#1ED2AF]" />
            <h1 className="text-4xl md:text-5xl mb-4">Track Your Order</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enter your order details below to track your VIBRIVO package in real-time
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!tracking ? (
          // Track Order Form
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl text-[#111111] mb-6">Enter Order Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g., VIB-123456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ED2AF] focus:border-transparent"
                    />
                    <Package className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Found in your order confirmation email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ED2AF] focus:border-transparent"
                    />
                    <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    The email used when placing the order
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1ED2AF] text-white py-3 rounded-lg hover:bg-[#19b899] transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Track Order
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-[#111111] mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a href="tel:+441234567890" className="flex items-center gap-3 text-gray-700 hover:text-[#1ED2AF] transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+44 (0) 123 456 7890</span>
                  </a>
                  <a href="mailto:support@vibrivo.com" className="flex items-center gap-3 text-gray-700 hover:text-[#1ED2AF] transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>support@vibrivo.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-6 text-center">
                <Truck className="w-10 h-10 mx-auto mb-3 text-[#1ED2AF]" />
                <h3 className="font-semibold text-[#111111] mb-2">Free U.S. Shipping</h3>
                <p className="text-sm text-gray-600">On orders $150+</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <Clock className="w-10 h-10 mx-auto mb-3 text-[#C7A14A]" />
                <h3 className="font-semibold text-[#111111] mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <Package className="w-10 h-10 mx-auto mb-3 text-[#1ED2AF]" />
                <h3 className="font-semibold text-[#111111] mb-2">Real-Time Updates</h3>
                <p className="text-sm text-gray-600">Track every step</p>
              </div>
            </div>
          </div>
        ) : (
          // Tracking Results
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1ED2AF] to-[#19b899] text-white p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl mb-2">Order #{tracking.orderNumber}</h2>
                    <p className="text-white/90">Tracking: {tracking.trackingNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/90 mb-1">Estimated Delivery</p>
                    <p className="text-xl font-semibold">{tracking.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1ED2AF] rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#111111]">
                      {tracking.updates[0].status}
                    </h3>
                    <p className="text-gray-600">Carrier: {tracking.carrier}</p>
                  </div>
                </div>
                <p className="text-gray-700 bg-[#F5F3EE] rounded-lg p-4">
                  Your package is on its way and should arrive by {tracking.estimatedDelivery}. 
                  You'll receive an email notification when it's delivered.
                </p>
              </div>

              {/* Tracking Timeline */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-[#111111] mb-6">Tracking History</h3>
                <div className="space-y-6">
                  {tracking.updates.map((update: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            update.completed
                              ? 'bg-[#1ED2AF] text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {update.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        {index < tracking.updates.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              update.completed ? 'bg-[#1ED2AF]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                          <h4 className="font-semibold text-[#111111]">{update.status}</h4>
                          <span className="text-sm text-gray-500">
                            {update.date} at {update.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{update.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 bg-[#F5F3EE] flex flex-wrap gap-4">
                <button
                  onClick={() => setTracking(null)}
                  className="flex-1 px-6 py-3 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors"
                >
                  Track Another Order
                </button>
                <button className="flex-1 px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#19b899] transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="mt-8 bg-white rounded-lg p-6">
              <h3 className="font-semibold text-[#111111] mb-4">Delivery Information</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">What if I'm not home?</h4>
                  <p className="text-gray-600">
                    The carrier will leave a delivery note with instructions for redelivery or collection.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Safe Place Instructions</h4>
                  <p className="text-gray-600">
                    You can leave delivery instructions with the carrier when they attempt delivery.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Issues?</h4>
                  <p className="text-gray-600">
                    Contact our support team at support@vibrivo.com or call +44 (0) 123 456 7890.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Returns & Exchanges</h4>
                  <p className="text-gray-600">
                    Free returns within 30 days. Items must be unworn with original tags attached.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}