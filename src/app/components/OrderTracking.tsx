import { useState } from 'react';
import { Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

export function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState('TRK1234567890');
  const [trackingData] = useState({
    orderNumber: '#VBR-2024-002',
    status: 'In Transit',
    estimatedDelivery: '2024-12-25',
    carrier: 'Royal Mail',
    trackingNumber: 'TRK1234567890',
    timeline: [
      {
        status: 'Order Placed',
        date: '2024-12-10 10:30 AM',
        location: 'London, UK',
        completed: true,
      },
      {
        status: 'Order Confirmed',
        date: '2024-12-10 11:15 AM',
        location: 'London, UK',
        completed: true,
      },
      {
        status: 'Preparing for Shipment',
        date: '2024-12-11 09:00 AM',
        location: 'Warehouse - London',
        completed: true,
      },
      {
        status: 'Shipped',
        date: '2024-12-12 02:30 PM',
        location: 'Sorting Center - London',
        completed: true,
      },
      {
        status: 'In Transit',
        date: '2024-12-20 08:45 AM',
        location: 'Distribution Hub - Manchester',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        date: 'Expected: 2024-12-25 09:00 AM',
        location: 'Local Depot',
        completed: false,
      },
      {
        status: 'Delivered',
        date: 'Pending',
        location: 'Your Address',
        completed: false,
      },
    ],
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">Order Tracking</h1>
        <p className="text-gray-600">Track your order in real-time</p>
      </div>

      {/* Tracking Input */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Enter Tracking Number</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            placeholder="Enter your tracking number"
          />
          <button className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors">
            Track
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-[#1ED2AF] to-[#111111] text-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Order Number</p>
            <p className="text-lg">{trackingData.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Current Status</p>
            <p className="text-lg">{trackingData.status}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Carrier</p>
            <p className="text-lg">{trackingData.carrier}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Estimated Delivery</p>
            <p className="text-lg">{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-6">Tracking Timeline</h2>
        <div className="space-y-6">
          {trackingData.timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    event.completed
                      ? 'bg-[#1ED2AF] text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {event.status === 'Order Placed' && <Package className="w-6 h-6" />}
                  {event.status === 'Order Confirmed' && <CheckCircle className="w-6 h-6" />}
                  {event.status === 'Preparing for Shipment' && <Clock className="w-6 h-6" />}
                  {event.status === 'Shipped' && <Truck className="w-6 h-6" />}
                  {event.status === 'In Transit' && <Truck className="w-6 h-6" />}
                  {event.status === 'Out for Delivery' && <Truck className="w-6 h-6" />}
                  {event.status === 'Delivered' && <CheckCircle className="w-6 h-6" />}
                </div>
                {index < trackingData.timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-16 ${
                      event.completed ? 'bg-[#1ED2AF]' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3
                  className={`text-lg mb-1 ${
                    event.completed ? 'text-[#111111]' : 'text-gray-400'
                  }`}
                >
                  {event.status}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{event.date}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-[#F5F3EE] rounded-lg p-6">
        <h3 className="text-lg text-[#111111] mb-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you have any questions about your order, our customer service team is here to help.
        </p>
        <button className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
