import { useState } from 'react';
import { CreditCard, Plus, Edit, Trash2, Star } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isDefault: boolean;
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      holderName: 'Sarah Johnson',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '2026',
      holderName: 'Sarah Johnson',
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    type: 'visa' as PaymentMethod['type'],
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    isDefault: false,
  });

  const getCardIcon = (type: PaymentMethod['type']) => {
    const colors = {
      visa: 'bg-blue-600',
      mastercard: 'bg-red-600',
      amex: 'bg-green-600',
      paypal: 'bg-blue-400',
    };
    return colors[type] || 'bg-gray-600';
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleSave = () => {
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formData.type,
      last4: formData.cardNumber.slice(-4),
      expiryMonth: formData.expiryMonth,
      expiryYear: formData.expiryYear,
      holderName: formData.holderName,
      isDefault: formData.isDefault,
    };
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setIsAddingNew(false);
    setFormData({
      type: 'visa',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      isDefault: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#111111] mb-2">Payment Methods</h1>
          <p className="text-gray-600">Manage your saved payment methods</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Payment
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-500 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <div>
            <h3 className="text-blue-900 mb-1">Secure Payment Information</h3>
            <p className="text-sm text-blue-700">
              All payment information is encrypted and stored securely. We never store your CVV.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Payment Form */}
      {isAddingNew && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-[#111111] mb-4">Add New Payment Method</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Card Type</label>
              <div className="grid grid-cols-4 gap-3">
                {['visa', 'mastercard', 'amex', 'paypal'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type: type as PaymentMethod['type'] })}
                    className={`p-4 border-2 rounded-lg capitalize transition-all ${
                      formData.type === type
                        ? 'border-[#1ED2AF] bg-[#1ED2AF]/10'
                        : 'border-gray-300 hover:border-[#1ED2AF]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Expiry Month</label>
                <input
                  type="text"
                  value={formData.expiryMonth}
                  onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                  placeholder="MM"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Expiry Year</label>
                <input
                  type="text"
                  value={formData.expiryYear}
                  onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                  placeholder="YYYY"
                  maxLength={4}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={formData.holderName}
                onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-5 h-5 text-[#1ED2AF] border-gray-300 rounded focus:ring-[#1ED2AF]"
                />
                <span className="text-gray-700">Set as default payment method</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
            >
              Save Payment Method
            </button>
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-white rounded-lg shadow-lg p-6 relative ${
              method.isDefault ? 'ring-2 ring-[#1ED2AF]' : ''
            }`}
          >
            {method.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#1ED2AF] text-white px-3 py-1 rounded-full text-sm">
                <Star className="w-4 h-4 fill-current" />
                Default
              </div>
            )}
            <div className="flex items-start gap-4 mb-4">
              <div className={`${getCardIcon(method.type)} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#111111] mb-1 capitalize">{method.type}</h3>
                <p className="text-gray-700">•••• •••• •••• {method.last4}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Expires: {method.expiryMonth}/{method.expiryYear}
                </p>
                <p className="text-sm text-gray-600">{method.holderName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!method.isDefault && (
                <>
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors text-sm"
                  >
                    <Star className="w-4 h-4" />
                    Set Default
                  </button>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
