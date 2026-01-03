import { useState } from 'react';
import { RotateCcw, Package, CheckCircle, Clock, Info } from 'lucide-react';

interface Return {
  id: string;
  orderNumber: string;
  productName: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  requestDate: string;
}

export function ReturnsExchanges() {
  const [returns, setReturns] = useState<Return[]>([
    {
      id: 'RET-001',
      orderNumber: '#VBR-2024-001',
      productName: 'Premium Cashmere Sweater',
      reason: 'Size too large',
      status: 'Approved',
      requestDate: '2024-12-18',
    },
  ]);

  const [isRequestingReturn, setIsRequestingReturn] = useState(false);
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    productName: '',
    reason: '',
    returnType: 'refund',
  });

  const handleSubmitReturn = () => {
    const newReturn: Return = {
      id: `RET-${(returns.length + 1).toString().padStart(3, '0')}`,
      orderNumber: returnForm.orderNumber,
      productName: returnForm.productName,
      reason: returnForm.reason,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
    };
    setReturns([...returns, newReturn]);
    setIsRequestingReturn(false);
    setReturnForm({
      orderNumber: '',
      productName: '',
      reason: '',
      returnType: 'refund',
    });
    alert('Return request submitted successfully!');
  };

  const getStatusColor = (status: Return['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Approved':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#111111] mb-2">Returns & Exchanges</h1>
          <p className="text-gray-600">Manage your product returns and exchanges</p>
        </div>
        <button
          onClick={() => setIsRequestingReturn(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Request Return
        </button>
      </div>

      {/* Return Policy */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-500 mt-0.5" />
          <div>
            <h3 className="text-blue-900 mb-2">Return Policy</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 30-day return window from date of delivery</li>
              <li>• Items must be unworn, unwashed, and in original condition with tags</li>
              <li>• Free returns on all UK orders</li>
              <li>• Refunds processed within 5-7 business days after receipt</li>
              <li>• Exchange items shipped within 2-3 business days of approval</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Return Request Form */}
      {isRequestingReturn && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-[#111111] mb-4">Request a Return or Exchange</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Order Number</label>
              <input
                type="text"
                value={returnForm.orderNumber}
                onChange={(e) => setReturnForm({ ...returnForm, orderNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="#VBR-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={returnForm.productName}
                onChange={(e) => setReturnForm({ ...returnForm, productName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="Premium Cashmere Sweater"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Return Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setReturnForm({ ...returnForm, returnType: 'refund' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    returnForm.returnType === 'refund'
                      ? 'border-[#1ED2AF] bg-[#1ED2AF]/10'
                      : 'border-gray-300 hover:border-[#1ED2AF]'
                  }`}
                >
                  Refund
                </button>
                <button
                  onClick={() => setReturnForm({ ...returnForm, returnType: 'exchange' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    returnForm.returnType === 'exchange'
                      ? 'border-[#1ED2AF] bg-[#1ED2AF]/10'
                      : 'border-gray-300 hover:border-[#1ED2AF]'
                  }`}
                >
                  Exchange
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Reason for Return</label>
              <select
                value={returnForm.reason}
                onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
              >
                <option value="">Select a reason</option>
                <option value="Size too small">Size too small</option>
                <option value="Size too large">Size too large</option>
                <option value="Wrong item received">Wrong item received</option>
                <option value="Damaged item">Damaged item</option>
                <option value="Not as described">Not as described</option>
                <option value="Changed my mind">Changed my mind</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmitReturn}
              className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
            >
              Submit Request
            </button>
            <button
              onClick={() => setIsRequestingReturn(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Returns List */}
      <div className="space-y-4">
        {returns.map((returnItem) => (
          <div key={returnItem.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#F5F3EE] p-3 rounded-lg">
                  <RotateCcw className="w-6 h-6 text-[#1ED2AF]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#111111] mb-1">Return {returnItem.id}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Order: {returnItem.orderNumber} • Requested on{' '}
                    {new Date(returnItem.requestDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-1">{returnItem.productName}</p>
                  <p className="text-sm text-gray-600">Reason: {returnItem.reason}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(returnItem.status)}`}>
                  {returnItem.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {returns.length === 0 && !isRequestingReturn && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl text-[#111111] mb-2">No Return Requests</h3>
          <p className="text-gray-600 mb-6">You haven't requested any returns yet</p>
        </div>
      )}
    </div>
  );
}
