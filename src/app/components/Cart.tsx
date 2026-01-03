import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { convertPrice, currencySymbol } = useCurrency();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Update cart count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', String(totalItems));
    window.dispatchEvent(new Event('storage'));
  }, [cartItems]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleMoveToWishlist = (item: CartItem) => {
    // Get current wishlist
    const savedWishlist = localStorage.getItem('wishlistItems');
    let wishlist = [];
    try {
      wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      wishlist = [];
    }

    // Add to wishlist if not already there
    const exists = wishlist.find((w: CartItem) => w.id === item.id);
    if (!exists) {
      wishlist.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        inStock: true,
      });
      localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
      localStorage.setItem('wishlistCount', String(wishlist.length));
      window.dispatchEvent(new Event('storage'));
    }

    // Remove from cart
    handleRemove(item.id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% sales tax (average U.S. rate)
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3EE] to-white py-12">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-[#111111] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Banner */}
              {remainingForFreeShipping > 0 && (
                <div className="bg-gradient-to-r from-[#1ED2AF] to-[#1ac29e] text-white p-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium">
                    Add {currencySymbol}{remainingForFreeShipping.toFixed(2)} more to get <strong>FREE SHIPPING</strong>!
                  </p>
                  <div className="mt-2 w-full bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-32 h-32 bg-[#F5F3EE] rounded-xl flex items-center justify-center overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-lg text-[#111111] hover:text-[#1ED2AF] transition-colors mb-2 font-medium">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        {item.size && (
                          <div>
                            <span className="font-medium">Size:</span> {item.size}
                          </div>
                        )}
                        {item.color && (
                          <div>
                            <span className="font-medium">Color:</span> {item.color}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-[#F5F3EE] rounded-lg px-3 py-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-600 hover:text-[#1ED2AF] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-[#111111] font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-600 hover:text-[#1ED2AF] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-xl text-[#111111] font-semibold">
                          {convertPrice(item.price * item.quantity)}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#C7A14A] transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Move to Wishlist
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl text-[#111111] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{convertPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-[#1ED2AF] font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : convertPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sales Tax (8%)</span>
                    <span>{convertPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl text-[#111111] font-bold">
                      <span>Total</span>
                      <span>{convertPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full py-4 bg-gradient-to-r from-[#1ED2AF] to-[#1ac29e] text-white rounded-xl hover:from-[#111111] hover:to-[#222] transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-semibold shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/"
                  className="w-full py-3 mt-3 border-2 border-[#C7A14A] text-[#C7A14A] rounded-xl hover:bg-[#C7A14A] hover:text-white transition-all flex items-center justify-center gap-2 font-medium"
                >
                  Continue Shopping
                </Link>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">Popular U.S. Payment Methods:</p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">Visa</div>
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">Mastercard</div>
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">Amex</div>
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">PayPal</div>
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">Apple Pay</div>
                    <div className="bg-[#F5F3EE] px-3 py-2 rounded text-xs font-medium">Google Pay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center max-w-2xl mx-auto">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl text-[#111111] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#1ED2AF] to-[#1ac29e] text-white rounded-xl hover:from-[#111111] hover:to-[#222] transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Trust Badges */}
        {cartItems.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-[#1ED2AF] text-3xl mb-2">✓</div>
                <h3 className="text-lg text-[#111111] font-semibold mb-2">Secure Checkout</h3>
                <p className="text-sm text-gray-600">Your payment information is encrypted and secure</p>
              </div>
              <div>
                <div className="text-[#1ED2AF] text-3xl mb-2">↻</div>
                <h3 className="text-lg text-[#111111] font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy on all items</p>
              </div>
              <div>
                <div className="text-[#1ED2AF] text-3xl mb-2">✈</div>
                <h3 className="text-lg text-[#111111] font-semibold mb-2">Free U.S. Shipping</h3>
                <p className="text-sm text-gray-600">On orders ${freeShippingThreshold}+</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}