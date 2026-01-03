import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const colors = {
  charcoal: '#111111',
  cream: '#F5F3EE',
  teal: '#1ED2AF',
  gold: '#C7A14A'
};

export function StickyCartBar() {
  const { items, totalItems, subtotal, shipping, total, discount, discountCode, setDiscountCode, showCart, setShowCart, updateQuantity, removeItem } = useCart();
  const { convertPrice } = useCurrency();
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  const handleApplyCode = () => {
    const validCodes = ['VIBRIVO15', 'WELCOME10', 'SAVE20'];
    if (validCodes.includes(codeInput.toUpperCase())) {
      setDiscountCode(codeInput.toUpperCase());
      setCodeSuccess('Discount applied!');
      setCodeError('');
    } else {
      setCodeError('Invalid code');
      setCodeSuccess('');
    }
  };

  return (
    <>
      {/* Sticky Bottom Bar - Show when cart has items */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
            style={{ backgroundColor: colors.charcoal }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-white" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
                  </p>
                  <p className="text-gray-300 text-sm">
                    Subtotal: {convertPrice(subtotal)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCart(true)}
                  className="px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2"
                  style={{ backgroundColor: colors.teal, color: colors.charcoal }}
                >
                  View Cart
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer - Side Panel */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: colors.cream }}>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" style={{ color: colors.charcoal }} />
                  <h2 className="text-2xl font-bold" style={{ color: colors.charcoal }}>
                    Your Cart ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" style={{ color: colors.charcoal }} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                    <Link to="/collection">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCart(false)}
                        className="px-6 py-3 rounded-lg font-bold text-white"
                        style={{ backgroundColor: colors.teal }}
                      >
                        Start Shopping
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cream }}>
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-bold mb-1" style={{ color: colors.charcoal }}>
                            {item.name}
                          </h3>
                          <div className="text-sm text-gray-600 mb-2">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.embroidery && <span className="block">Embroidery: "{item.embroidery}"</span>}
                            {item.giftWrap && <span className="block">🎁 Gift Wrap Added</span>}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-lg" style={{ color: colors.charcoal }}>
                                {convertPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  {convertPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id, item.size, item.color)}
                                className="p-1 rounded hover:bg-red-50 ml-2"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Summary */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-4 space-y-4" style={{ backgroundColor: colors.cream }}>
                  {/* Discount Code */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.charcoal }}>
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                        style={{ focusRingColor: colors.teal }}
                      />
                      <button
                        onClick={handleApplyCode}
                        className="px-4 py-2 rounded-lg font-bold text-white"
                        style={{ backgroundColor: colors.teal }}
                      >
                        Apply
                      </button>
                    </div>
                    {codeError && <p className="text-red-500 text-sm mt-1">{codeError}</p>}
                    {codeSuccess && <p className="text-green-600 text-sm mt-1">✓ {codeSuccess}</p>}
                    <p className="text-xs text-gray-500 mt-2">
                      Try: VIBRIVO15, WELCOME10, or SAVE20
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 py-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">{convertPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm" style={{ color: colors.teal }}>
                        <span>Discount ({discountCode})</span>
                        <span className="font-semibold">-{convertPrice(subtotal * discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? 'FREE' : convertPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs" style={{ color: colors.teal }}>
                        Add {convertPrice(150 - subtotal)} more for FREE shipping!
                      </p>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl" style={{ color: colors.charcoal }}>
                        {convertPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600 py-2">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" style={{ color: colors.teal }} />
                      <span>Fast Shipping</span>
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-2">
                    <Link to="/cart" onClick={() => setShowCart(false)}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2"
                        style={{ backgroundColor: colors.teal }}
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>
                    <button
                      onClick={() => setShowCart(false)}
                      className="w-full px-6 py-3 rounded-xl font-semibold text-center"
                      style={{ color: colors.charcoal, backgroundColor: 'white', border: `2px solid ${colors.charcoal}` }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
