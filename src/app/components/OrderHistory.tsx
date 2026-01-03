import { useState } from 'react';
import { Package, ChevronRight, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Shipped' | 'Cancelled';
  total: number;
  items: { name: string; quantity: number; price: number; image: string }[];
  tracking?: string;
}

export function OrderHistory() {
  const [orders] = useState<Order[]>([
    {
      id: '#VBR-2024-001',
      date: '2024-12-15',
      status: 'Completed',
      total: 289.99,
      tracking: 'TRK1234567890',
      items: [
        { name: 'Premium Cashmere Sweater', quantity: 1, price: 189.99, image: 'sweater1' },
        { name: 'Merino Wool Scarf', quantity: 2, price: 50.00, image: 'scarf1' },
      ],
    },
    {
      id: '#VBR-2024-002',
      date: '2024-12-10',
      status: 'Shipped',
      total: 159.99,
      tracking: 'TRK0987654321',
      items: [
        { name: 'Essential Turtleneck', quantity: 1, price: 159.99, image: 'sweater2' },
      ],
    },
    {
      id: '#VBR-2024-003',
      date: '2024-11-28',
      status: 'Completed',
      total: 449.97,
      items: [
        { name: 'Luxury Cashmere Blend', quantity: 3, price: 149.99, image: 'sweater3' },
      ],
    },
    {
      id: '#VBR-2024-004',
      date: '2024-11-15',
      status: 'In Progress',
      total: 199.99,
      items: [
        { name: 'Winter Collection Bundle', quantity: 1, price: 199.99, image: 'bundle1' },
      ],
    },
  ]);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleReorder = (order: Order) => {
    alert(`Adding ${order.items.length} item(s) to cart from order ${order.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">Order History</h1>
        <p className="text-gray-600">View and manage your past orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Order Summary */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F5F3EE] p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#1ED2AF]" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#111111]">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="text-lg text-[#111111]">£{order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                </button>
                <button
                  onClick={() => handleReorder(order)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-[#1ED2AF] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Reorder
                </button>
                {order.tracking && (
                  <Link
                    to={`/account/tracking?order=${order.id}`}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#1ED2AF] hover:text-[#1ED2AF] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Track Order
                  </Link>
                )}
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-[#111111] mb-4">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F5F3EE] rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-[#1ED2AF]" />
                          </div>
                          <div>
                            <p className="text-[#111111]">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-[#111111]">£{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  {order.tracking && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">Tracking Number</p>
                      <p className="text-[#111111] font-mono">{order.tracking}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no orders) */}
      {orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl text-[#111111] mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
