import { Heart, ShoppingCart, X, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  salePrice?: number;
}

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { convertPrice } = useCurrency();

  // Load wishlist items from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlistItems([]);
      }
    }
  }, []);

  // Save wishlist items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    localStorage.setItem('wishlistCount', String(wishlistItems.length));
    window.dispatchEvent(new Event('storage'));
  }, [wishlistItems]);

  const handleRemove = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Get current cart
    const savedCart = localStorage.getItem('cartItems');
    let cart = [];
    try {
      cart = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      cart = [];
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Increase quantity if exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: item.id,
        name: item.name,
        price: item.salePrice || item.price,
        image: item.image,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', String(totalItems));
    window.dispatchEvent(new Event('storage'));

    // Show success message
    alert(`${item.name} added to cart!`);
  };

  const handleShareWishlist = async () => {
    const wishlistUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(wishlistUrl);
      alert('Wishlist link copied to clipboard!');
    } catch (err) {
      // Fallback for when clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = wishlistUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Wishlist link copied to clipboard!');
      } catch (e) {
        alert(`Unable to copy. Please copy manually: ${wishlistUrl}`);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#111111] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleShareWishlist}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Wishlist
          </button>
        )}
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                {/* Product Image */}
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square bg-[#F5F3EE] flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Sale Badge */}
                {item.salePrice && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Sale
                  </div>
                )}

                {/* Out of Stock Badge */}
                {!item.inStock && (
                  <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Out of Stock
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all shadow-lg hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5">
                <Link to={`/product/${item.id}`} className="block mb-3">
                  <h3 className="text-lg text-[#111111] hover:text-[#1ED2AF] transition-colors font-medium">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-4">
                  {item.salePrice ? (
                    <>
                      <span className="text-xl text-[#111111] font-semibold">{convertPrice(item.salePrice)}</span>
                      <span className="text-gray-500 line-through">{convertPrice(item.price)}</span>
                    </>
                  ) : (
                    <span className="text-xl text-[#111111] font-semibold">{convertPrice(item.price)}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {item.inStock ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1ED2AF] to-[#1ac29e] text-white rounded-lg hover:from-[#111111] hover:to-[#222] transition-all transform hover:scale-105 shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 px-4 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Wishlist State */
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl text-[#111111] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Wishlist is Empty
          </h3>
          <p className="text-gray-600 mb-6">
            Save your favorite items here to easily find them later
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#1ED2AF] to-[#1ac29e] text-white rounded-lg hover:from-[#111111] hover:to-[#222] transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* Wishlist Tips */}
      {wishlistItems.length > 0 && (
        <div className="bg-gradient-to-r from-[#F5F3EE] to-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg text-[#111111] mb-3 font-semibold">Wishlist Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#1ED2AF] font-bold">•</span>
              <span>Items in your wishlist are saved for 90 days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1ED2AF] font-bold">•</span>
              <span>Share your wishlist with friends and family</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1ED2AF] font-bold">•</span>
              <span>Get notified when items go on sale</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1ED2AF] font-bold">•</span>
              <span>Add items to your cart directly from your wishlist</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
